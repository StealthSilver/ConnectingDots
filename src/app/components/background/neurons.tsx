"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getOptimalParticleCount } from "@/utils/deviceLOD";

const MAX_CAP = 600;

/** Fisher–Yates shuffle in-place. */
function shuffleInPlace<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
}

/**
 * Shuffled jittered grid: one sample per cell (random offset inside the cell) so
 * points cover volume evenly without Halton/low-discrepancy streaks that read as lines.
 */
function fillJitteredGridPositions(
  positions: Float32Array,
  particleCount: number,
  spanX: number,
  spanY: number,
  spanZ: number,
): void {
  const n = Math.max(2, Math.ceil(Math.cbrt(particleCount)));
  const cells: [number, number, number][] = [];
  for (let ix = 0; ix < n; ix++) {
    for (let iy = 0; iy < n; iy++) {
      for (let iz = 0; iz < n; iz++) {
        cells.push([ix, iy, iz]);
      }
    }
  }
  shuffleInPlace(cells);

  const halfX = spanX / 2;
  const halfY = spanY / 2;
  const halfZ = spanZ / 2;

  for (let i = 0; i < particleCount; i++) {
    const cell = cells[i] ?? [0, 0, 0];
    const [ix, iy, iz] = cell;
    const i3 = i * 3;
    positions[i3] = ((ix + Math.random()) / n) * spanX - halfX;
    positions[i3 + 1] = ((iy + Math.random()) / n) * spanY - halfY;
    positions[i3 + 2] = ((iz + Math.random()) / n) * spanZ - halfZ;
  }
}

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
        float alpha = smoothstep(0.5, 0.0, r) * 1.15;
        gl_FragColor = vec4(vColor, min(alpha, 1.0));
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
      // Use viewport so the field always matches full page width/height, not a parent box.
      const w = window.innerWidth;
      const h = window.innerHeight;
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

    const aspect =
      window.innerWidth / Math.max(1, window.innerHeight);
    const spanY = 60;
    const spanZ = 60;
    /** Wider X extent matches viewport so the field uses horizontal screen space evenly. */
    const spanX = 60 * Math.max(1.15, aspect);
    const halfX = spanX / 2;
    const halfY = spanY / 2;
    const halfZ = spanZ / 2;
    const volume = spanX * spanY * spanZ;
    const avgSpacing = Math.cbrt(volume / particleCount);
    const maxSpan = Math.max(spanX, spanY, spanZ);
    /** Neighbor links: ~2× mean spacing, capped so graphs stay local. */
    const maxDistance = Math.min(maxSpan * 0.28, Math.max(4.2, avgSpacing * 2.15));

    const colorPalette: [number, number, number][] = [
      [1, 0.7, 0.7],
      [0.7, 0.7, 1],
      [1, 1, 0.7],
      [0.7, 1, 0.7],
      [1, 0.7, 1],
      [0.7, 1, 1],
    ];

    fillJitteredGridPositions(positions, particleCount, spanX, spanY, spanZ);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      const color =
        colorPalette[Math.floor(Math.random() * colorPalette.length)]!;
      colors[i3] = color[0];
      colors[i3 + 1] = color[1];
      colors[i3 + 2] = color[2];

      sizes[i] = 0.45 + Math.random() * 0.45;

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
      opacity: 0.5,
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

      const isDark = document.documentElement.classList.contains("dark");
      lineMaterial.opacity = isDark ? 0.26 : 0.55;

      let lineIndex = 0;
      checked.clear();

      scene.rotation.y += 0.0006;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posBuf[i3] += velocities[i3] ?? 0;
        posBuf[i3 + 1] += velocities[i3 + 1] ?? 0;
        posBuf[i3 + 2] += velocities[i3 + 2] ?? 0;
        const lim = [halfX, halfY, halfZ];
        for (let j = 0; j < 3; j++) {
          if (Math.abs(posBuf[i3 + j] ?? 0) > (lim[j] ?? 30)) {
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
      className="pointer-events-none fixed inset-0 z-0 w-full min-w-full max-w-none overflow-hidden bg-transparent opacity-100 dark:opacity-[0.38]"
      aria-hidden
    />
  );
}

export default Neurons;
