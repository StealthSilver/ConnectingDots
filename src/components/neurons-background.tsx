"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";
import * as THREE from "three";

import { cn } from "@/lib/utils";

const particleVertexShader = /* glsl */ `
  attribute float size;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (440.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = /* glsl */ `
  uniform float uAlphaBoost;
  varying vec3 vColor;
  void main() {
    float r = length(gl_PointCoord - vec2(0.5));
    if (r > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, r);
    gl_FragColor = vec4(vColor, min(1.0, alpha * uAlphaBoost));
  }
`;

type Palette = {
  particleMin: number;
  particleMax: number;
  lineShade: number;
  lineOpacity: number;
  /** Multiplies soft-edge alpha so dots read better on light backgrounds. */
  particleAlphaBoost: number;
};

const lightPalette: Palette = {
  particleMin: 0.24,
  particleMax: 0.56,
  lineShade: 0.36,
  lineOpacity: 0.36,
  particleAlphaBoost: 1.28,
};

const darkPalette: Palette = {
  particleMin: 0.7,
  particleMax: 1.0,
  lineShade: 0.85,
  lineOpacity: 0.22,
  particleAlphaBoost: 1.0,
};

export function NeuronsBackground({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const palette = resolvedTheme === "dark" ? darkPalette : lightPalette;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const initialWidth = Math.max(1, mount.clientWidth);
    const initialHeight = Math.max(1, mount.clientHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      initialWidth / initialHeight,
      0.1,
      1000,
    );
    camera.position.z = 62;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(initialWidth, initialHeight, false);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const isMobile = initialWidth < 640;
    const particleCount = isMobile ? 160 : 260;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const maxDistance = 6;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 18 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const shade =
        palette.particleMin +
        Math.random() * (palette.particleMax - palette.particleMin);
      colors[i3] = shade;
      colors[i3 + 1] = shade;
      colors[i3 + 2] = shade;

      sizes[i] = 0.92 + Math.random() * 0.88;

      velocities[i3] = (Math.random() - 0.5) * 0.05;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uAlphaBoost: { value: palette.particleAlphaBoost },
      },
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
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3),
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: palette.lineOpacity,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    const GRID_SIZE = maxDistance;
    const spatialGrid = new Map<string, number[]>();

    const getCellKey = (x: number, y: number, z: number) => {
      const cellX = Math.floor(x / GRID_SIZE);
      const cellY = Math.floor(y / GRID_SIZE);
      const cellZ = Math.floor(z / GRID_SIZE);
      return `${cellX},${cellY},${cellZ}`;
    };

    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const positionAttr = geometry.attributes.position;
      const positionArray = positionAttr.array as Float32Array;
      let lineIndex = 0;

      if (!prefersReducedMotion) {
        scene.rotation.y += 0.0006;
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        if (!prefersReducedMotion) {
          positionArray[i3] += velocities[i3];
          positionArray[i3 + 1] += velocities[i3 + 1];
          positionArray[i3 + 2] += velocities[i3 + 2];
        }

        for (let j = 0; j < 3; j++) {
          if (Math.abs(positionArray[i3 + j]) > 25) {
            velocities[i3 + j] *= -0.8;
          }
        }
      }

      spatialGrid.clear();
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const key = getCellKey(
          positionArray[i3],
          positionArray[i3 + 1],
          positionArray[i3 + 2],
        );
        let bucket = spatialGrid.get(key);
        if (!bucket) {
          bucket = [];
          spatialGrid.set(key, bucket);
        }
        bucket.push(i);
      }

      const checkedPairs = new Set<number>();
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const cx = Math.floor(positionArray[i3] / GRID_SIZE);
        const cy = Math.floor(positionArray[i3 + 1] / GRID_SIZE);
        const cz = Math.floor(positionArray[i3 + 2] / GRID_SIZE);

        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
              const adjKey = `${cx + dx},${cy + dy},${cz + dz}`;
              const nearby = spatialGrid.get(adjKey);
              if (!nearby) continue;

              for (const j of nearby) {
                if (i >= j) continue;

                const pairId = i * particleCount + j;
                if (checkedPairs.has(pairId)) continue;
                checkedPairs.add(pairId);

                const j3 = j * 3;
                const ddx = positionArray[i3] - positionArray[j3];
                const ddy = positionArray[i3 + 1] - positionArray[j3 + 1];
                const ddz = positionArray[i3 + 2] - positionArray[j3 + 2];
                const distSq = ddx * ddx + ddy * ddy + ddz * ddz;

                if (
                  distSq < maxDistance * maxDistance &&
                  lineIndex < maxConnections * 6
                ) {
                  linePositions[lineIndex] = positionArray[i3];
                  linePositions[lineIndex + 1] = positionArray[i3 + 1];
                  linePositions[lineIndex + 2] = positionArray[i3 + 2];
                  linePositions[lineIndex + 3] = positionArray[j3];
                  linePositions[lineIndex + 4] = positionArray[j3 + 1];
                  linePositions[lineIndex + 5] = positionArray[j3 + 2];

                  for (let k = 0; k < 6; k++) {
                    lineColors[lineIndex + k] = palette.lineShade;
                  }

                  lineIndex += 6;
                }
              }
            }
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      positionAttr.needsUpdate = true;
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      const w = Math.max(1, width);
      const h = Math.max(1, height);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    });
    resizeObserver.observe(mount);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className={cn("h-full w-full", className)}
    />
  );
}

export default NeuronsBackground;
