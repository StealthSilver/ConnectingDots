"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getOptimalParticleCount } from "@/utils/deviceLOD";

const MAX_CAP = 600;

/**
 * Full-viewport WebGL point + line “neuron” field. Intended as a non-interactive
 * page background: transparent canvas, no controls, throttled for visibility and
 * low-power preferences.
 */
export function Neurons() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const el = mountRef.current;
    const particleCount = getOptimalParticleCount(MAX_CAP);
    if (particleCount < 1) return;

    let rafId = 0;
    const checked = new Set<string>();

    const particleVertexShader = `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (400.0 / max(-mvPosition.z, 0.1));
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const particleFragmentShader = `
      varying vec3 vColor;
      void main() {
        float r = length(gl_PointCoord - vec2(0.5, 0.5));
        if (r > 0.5) discard;
        float alpha = smoothstep(0.5, 0.0, r);
        gl_FragColor = vec4(vColor, alpha);
      }
    `;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const setSize = () => {
      const w = el.clientWidth || window.innerWidth;
      const h = el.clientHeight || window.innerHeight;
      if (w < 1 || h < 1) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // `true` updates canvas CSS to match the draw buffer; `false` can leave a tiny default canvas.
      renderer.setSize(w, h, true);
    };
    setSize();
    const canvas = renderer.domElement;
    canvas.className = "absolute inset-0 block h-full w-full max-w-none";
    el.appendChild(canvas);
    requestAnimationFrame(() => setSize());

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const maxDistance = 6;

    const colorPalette: [number, number, number][] = [
      [1, 0.7, 0.7],
      [0.7, 0.7, 1],
      [1, 1, 0.7],
      [0.7, 1, 0.7],
      [1, 0.7, 1],
      [0.7, 1, 1],
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 20 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const color =
        colorPalette[Math.floor(Math.random() * colorPalette.length)]!;
      colors[i3] = color[0];
      colors[i3 + 1] = color[1];
      colors[i3 + 2] = color[2];

      sizes[i] = 0.5 + Math.random() * 0.5;

      velocities[i3] = (Math.random() - 0.5) * 0.06;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.06;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.06;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const maxConnections = particleCount * 2;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();

    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });

    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    lineSystem.frustumCulled = false;
    scene.add(lineSystem);

    camera.position.z = 61;

    const GRID_SIZE = maxDistance;
    const spatialGrid = new Map<string, number[]>();

    const getCellKey = (x: number, y: number, z: number): string => {
      const cellX = Math.floor(x / GRID_SIZE);
      const cellY = Math.floor(y / GRID_SIZE);
      const cellZ = Math.floor(z / GRID_SIZE);
      return `${cellX},${cellY},${cellZ}`;
    };

    const getAdjacentCells = (key: string): string[] => {
      const parts = key.split(",");
      const x = Number(parts[0]);
      const y = Number(parts[1]);
      const z = Number(parts[2]);
      const adjacent: string[] = [];
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dz = -1; dz <= 1; dz++) {
            adjacent.push(`${x + dx},${y + dy},${z + dz}`);
          }
        }
      }
      return adjacent;
    };

    const posBuf = geometry.attributes.position.array as Float32Array;
    const linePosBuf = linePositions;
    const lineColorBuf = lineColors;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (document.hidden) return;

      let lineIndex = 0;
      checked.clear();

      scene.rotation.y += 0.0006;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posBuf[i3] += velocities[i3] ?? 0;
        posBuf[i3 + 1] += velocities[i3 + 1] ?? 0;
        posBuf[i3 + 2] += velocities[i3 + 2] ?? 0;
        for (let j = 0; j < 3; j++) {
          if (Math.abs(posBuf[i3 + j] ?? 0) > 25) {
            const v = (velocities[i3 + j] ?? 0) * -0.8;
            velocities[i3 + j] = v;
          }
        }
      }

      spatialGrid.clear();
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const k = getCellKey(
          posBuf[i3]!,
          posBuf[i3 + 1]!,
          posBuf[i3 + 2]!,
        );
        if (!spatialGrid.has(k)) spatialGrid.set(k, []);
        spatialGrid.get(k)!.push(i);
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const cellKey = getCellKey(
          posBuf[i3]!,
          posBuf[i3 + 1]!,
          posBuf[i3 + 2]!,
        );
        for (const adjKey of getAdjacentCells(cellKey)) {
          const nearby = spatialGrid.get(adjKey);
          if (!nearby) continue;
          for (const j of nearby) {
            if (i >= j) continue;
            const pairKey = `${i},${j}`;
            if (checked.has(pairKey)) continue;
            checked.add(pairKey);
            const j3 = j * 3;
            const dx = (posBuf[i3] ?? 0) - (posBuf[j3] ?? 0);
            const dy = (posBuf[i3 + 1] ?? 0) - (posBuf[j3 + 1] ?? 0);
            const dz = (posBuf[i3 + 2] ?? 0) - (posBuf[j3 + 2] ?? 0);
            const distSq = dx * dx + dy * dy + dz * dz;
            if (
              distSq < maxDistance * maxDistance &&
              lineIndex + 6 <= linePosBuf.length
            ) {
              linePosBuf[lineIndex] = posBuf[i3] ?? 0;
              linePosBuf[lineIndex + 1] = posBuf[i3 + 1] ?? 0;
              linePosBuf[lineIndex + 2] = posBuf[i3 + 2] ?? 0;
              linePosBuf[lineIndex + 3] = posBuf[j3] ?? 0;
              linePosBuf[lineIndex + 4] = posBuf[j3 + 1] ?? 0;
              linePosBuf[lineIndex + 5] = posBuf[j3 + 2] ?? 0;
              for (let c = 0; c < 6; c++) {
                lineColorBuf[lineIndex + c] = 0.7;
              }
              lineIndex += 6;
            }
          }
        }
      }

      const vertexCount = lineIndex / 3;
      if (vertexCount > 0) {
        lineGeometry.setDrawRange(0, vertexCount);
        lineGeometry.attributes.position!.needsUpdate = true;
        lineGeometry.attributes.color!.needsUpdate = true;
      } else {
        lineGeometry.setDrawRange(0, 0);
      }

      geometry.attributes.position!.needsUpdate = true;
      renderer.render(scene, camera);
    };

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else {
        if (rafId === 0) rafId = requestAnimationFrame(tick);
      }
    };

    const onResize = () => setSize();

    rafId = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(() => onResize());
    ro.observe(el);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      cancelAnimationFrame(rafId);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      scene.clear();
      renderer.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 -z-10 m-0 box-border h-full min-h-[100dvh] w-full min-w-0 max-w-none overflow-hidden bg-transparent p-0 opacity-[0.92] dark:opacity-[0.28]"
      aria-hidden
    />
  );
}

export default Neurons;
