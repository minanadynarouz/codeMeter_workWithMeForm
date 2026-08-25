"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PERSON_CANVAS_W = 260;
const PERSON_CANVAS_H = 300;
const PERSON_POINT_CAP = 2400;
const GLOW_POINT_COUNT = 480;
const REPEL_RADIUS = 110;
const REPEL_STRENGTH = 5.2;
const SPRING_STRENGTH = 0.045;
const DAMPING = 0.9;
const IDLE_AMPLITUDE = 3.5;
const IDLE_FREQUENCY = 0.6;

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Stylized side-profile silhouette: a person sitting, hunched over a laptop. */
function drawPersonSilhouette(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const hipX = w * 0.34;
  const seatY = h * 0.62;

  ctx.fillRect(hipX - 50, seatY - 96, 10, 104);
  ctx.fillRect(hipX - 50, seatY + 2, 76, 8);

  ctx.save();
  ctx.translate(hipX - 4, seatY - 50);
  ctx.rotate(-0.3);
  roundRectPath(ctx, -19, -48, 38, 94, 19);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(hipX + 22, seatY - 112, 17, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 15;
  ctx.beginPath();
  ctx.moveTo(hipX + 8, seatY - 66);
  ctx.quadraticCurveTo(hipX + 38, seatY - 38, hipX + 58, seatY - 12);
  ctx.stroke();

  ctx.lineWidth = 21;
  ctx.beginPath();
  ctx.moveTo(hipX, seatY - 2);
  ctx.lineTo(hipX + 68, seatY + 4);
  ctx.stroke();

  ctx.lineWidth = 17;
  ctx.beginPath();
  ctx.moveTo(hipX + 68, seatY + 4);
  ctx.lineTo(hipX + 60, seatY + 90);
  ctx.stroke();

  roundRectPath(ctx, hipX + 44, seatY + 86, 28, 9, 4);
  ctx.fill();

  ctx.save();
  ctx.translate(hipX + 74, seatY - 20);
  roundRectPath(ctx, -8, -4, 50, 8, 3);
  ctx.fill();
  ctx.translate(40, -2);
  ctx.rotate(-1.2);
  roundRectPath(ctx, -3, -48, 8, 48, 3);
  ctx.fill();
  ctx.restore();
}

function sampleSilhouette(canvas: HTMLCanvasElement, cap: number) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  const { width, height } = canvas;
  const { data } = ctx.getImageData(0, 0, width, height);
  const step = 3;
  const points: { x: number; y: number }[] = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 120) {
        points.push({ x: x + (Math.random() - 0.5) * step, y: y + (Math.random() - 0.5) * step });
      }
    }
  }
  while (points.length > cap) {
    points.splice(Math.floor(Math.random() * points.length), 1);
  }
  const ref = height;
  return points.map((p) => ({
    nx: (p.x - width / 2) / ref,
    ny: (height / 2 - p.y) / ref,
  }));
}

function makeGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.7)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;
    const container: HTMLDivElement = containerEl;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const drawCanvas = document.createElement("canvas");
    drawCanvas.width = PERSON_CANVAS_W;
    drawCanvas.height = PERSON_CANVAS_H;
    const drawCtx = drawCanvas.getContext("2d")!;
    drawPersonSilhouette(drawCtx, PERSON_CANVAS_W, PERSON_CANVAS_H);
    const personNorm = sampleSilhouette(drawCanvas, PERSON_POINT_CAP);
    const personCount = personNorm.length;

    const glowNorm: { nx: number; ny: number }[] = [];
    for (let i = 0; i < GLOW_POINT_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.55 + Math.random() * 0.85;
      glowNorm.push({ nx: Math.cos(angle) * radius * 0.75, ny: Math.sin(angle) * radius });
    }
    const glowCount = glowNorm.length;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const pixelRatio = renderer.getPixelRatio();
    container.appendChild(renderer.domElement);

    const glowTexture = makeGlowTexture();

    const personGeometry = new THREE.BufferGeometry();
    const personHome = new Float32Array(personCount * 3);
    const personCurrent = new Float32Array(personCount * 3);
    const personVelocity = new Float32Array(personCount * 3);
    const personColor = new Float32Array(personCount * 3);
    const personPhase = new Float32Array(personCount);

    const colorTop = new THREE.Color("#a5f3fc");
    const colorBottom = new THREE.Color("#6366f1");

    for (let i = 0; i < personCount; i++) {
      const { nx, ny } = personNorm[i];
      const i3 = i * 3;
      personHome[i3] = nx;
      personHome[i3 + 1] = ny;
      personHome[i3 + 2] = (Math.random() - 0.5) * 14;
      personCurrent[i3] = personHome[i3] + (Math.random() - 0.5) * 420;
      personCurrent[i3 + 1] = personHome[i3 + 1] + (Math.random() - 0.5) * 420;
      personCurrent[i3 + 2] = personHome[i3 + 2];

      const t = Math.min(1, Math.max(0, (ny + 0.55) / 1.1));
      const c = colorBottom.clone().lerp(colorTop, t);
      personColor[i3] = c.r;
      personColor[i3 + 1] = c.g;
      personColor[i3 + 2] = c.b;

      personPhase[i] = Math.random() * Math.PI * 2;
    }

    personGeometry.setAttribute("position", new THREE.Float32BufferAttribute(personCurrent, 3).setUsage(THREE.DynamicDrawUsage));
    personGeometry.setAttribute("color", new THREE.Float32BufferAttribute(personColor, 3));

    const personMaterial = new THREE.PointsMaterial({
      size: 3.4 * pixelRatio,
      map: glowTexture,
      transparent: true,
      opacity: 0.95,
      vertexColors: true,
      depthWrite: false,
      sizeAttenuation: false,
      blending: THREE.AdditiveBlending,
    });
    const personPoints = new THREE.Points(personGeometry, personMaterial);
    scene.add(personPoints);

    const glowGeometry = new THREE.BufferGeometry();
    const glowHome = new Float32Array(glowCount * 3);
    const glowCurrent = new Float32Array(glowCount * 3);
    const glowVelocity = new Float32Array(glowCount * 3);
    const glowColor = new Float32Array(glowCount * 3);
    const glowPhase = new Float32Array(glowCount);

    const glowPalette = [new THREE.Color("#818cf8"), new THREE.Color("#67e8f9"), new THREE.Color("#e0e7ff")];

    for (let i = 0; i < glowCount; i++) {
      const { nx, ny } = glowNorm[i];
      const i3 = i * 3;
      glowHome[i3] = nx;
      glowHome[i3 + 1] = ny;
      glowHome[i3 + 2] = (Math.random() - 0.5) * 40;
      glowCurrent[i3] = glowHome[i3] + (Math.random() - 0.5) * 500;
      glowCurrent[i3 + 1] = glowHome[i3 + 1] + (Math.random() - 0.5) * 500;
      glowCurrent[i3 + 2] = glowHome[i3 + 2];

      const c = glowPalette[Math.floor(Math.random() * glowPalette.length)];
      glowColor[i3] = c.r;
      glowColor[i3 + 1] = c.g;
      glowColor[i3 + 2] = c.b;

      glowPhase[i] = Math.random() * Math.PI * 2;
    }

    glowGeometry.setAttribute("position", new THREE.Float32BufferAttribute(glowCurrent, 3).setUsage(THREE.DynamicDrawUsage));
    glowGeometry.setAttribute("color", new THREE.Float32BufferAttribute(glowColor, 3));

    const glowMaterial = new THREE.PointsMaterial({
      size: 1.6 * pixelRatio,
      map: glowTexture,
      transparent: true,
      opacity: 0.75,
      vertexColors: true,
      depthWrite: false,
      sizeAttenuation: false,
      blending: THREE.AdditiveBlending,
    });
    const glowPoints = new THREE.Points(glowGeometry, glowMaterial);
    scene.add(glowPoints);

    let width = 0;
    let height = 0;
    let anchorX = 0;
    let anchorY = 0;
    let scale = 1;

    function layout() {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      anchorX = width * 0.16;
      anchorY = -height * 0.02;
      scale = Math.max(150, Math.min(Math.min(height * 0.62, width * 0.34), 320));
    }

    layout();

    const resizeObserver = new ResizeObserver(() => layout());
    resizeObserver.observe(container);

    const mouseClient = { x: -9999, y: -9999 };
    let mouseTracked = false;

    function handlePointerMove(event: PointerEvent) {
      mouseClient.x = event.clientX;
      mouseClient.y = event.clientY;
      mouseTracked = true;
    }
    function handlePointerLeaveWindow() {
      mouseTracked = false;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeaveWindow);

    function step(
      homeArr: Float32Array,
      curArr: Float32Array,
      velArr: Float32Array,
      phaseArr: Float32Array,
      count: number,
      mouseWorldX: number,
      mouseWorldY: number,
      mouseActive: boolean,
      t: number
    ) {
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const hx = anchorX + homeArr[i3] * scale + Math.cos(t * IDLE_FREQUENCY * 0.8 + phaseArr[i]) * IDLE_AMPLITUDE * 0.5;
        const hy = anchorY + homeArr[i3 + 1] * scale + Math.sin(t * IDLE_FREQUENCY + phaseArr[i]) * IDLE_AMPLITUDE;

        const px = curArr[i3];
        const py = curArr[i3 + 1];

        let vx = velArr[i3];
        let vy = velArr[i3 + 1];

        if (mouseActive) {
          const dx = px - mouseWorldX;
          const dy = py - mouseWorldY;
          const distSq = dx * dx + dy * dy;
          if (distSq < REPEL_RADIUS * REPEL_RADIUS) {
            const dist = Math.sqrt(distSq) || 0.001;
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
          }
        }

        vx += (hx - px) * SPRING_STRENGTH;
        vy += (hy - py) * SPRING_STRENGTH;
        vx *= DAMPING;
        vy *= DAMPING;

        curArr[i3] = px + vx;
        curArr[i3 + 1] = py + vy;
        velArr[i3] = vx;
        velArr[i3 + 1] = vy;
      }
    }

    let rafId = 0;
    const clock = new THREE.Clock();

    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const rect = container.getBoundingClientRect();
      const insideHero =
        mouseClient.x >= rect.left && mouseClient.x <= rect.right && mouseClient.y >= rect.top && mouseClient.y <= rect.bottom;
      const mouseActive = mouseTracked && insideHero;
      const mouseWorldX = mouseClient.x - rect.left - width / 2;
      const mouseWorldY = height / 2 - (mouseClient.y - rect.top);

      step(personHome, personCurrent, personVelocity, personPhase, personCount, mouseWorldX, mouseWorldY, mouseActive, t);
      step(glowHome, glowCurrent, glowVelocity, glowPhase, glowCount, mouseWorldX, mouseWorldY, mouseActive, t);

      personGeometry.attributes.position.needsUpdate = true;
      glowGeometry.attributes.position.needsUpdate = true;
      glowMaterial.opacity = 0.55 + Math.sin(t * 1.4) * 0.2;

      renderer.render(scene, camera);
    }

    if (reduceMotion) {
      for (let i = 0; i < personCount; i++) {
        const i3 = i * 3;
        personCurrent[i3] = anchorX + personHome[i3] * scale;
        personCurrent[i3 + 1] = anchorY + personHome[i3 + 1] * scale;
      }
      for (let i = 0; i < glowCount; i++) {
        const i3 = i * 3;
        glowCurrent[i3] = anchorX + glowHome[i3] * scale;
        glowCurrent[i3 + 1] = anchorY + glowHome[i3 + 1] * scale;
      }
      personGeometry.attributes.position.needsUpdate = true;
      glowGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeaveWindow);
      renderer.dispose();
      personGeometry.dispose();
      personMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      glowTexture.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} aria-hidden className="pointer-events-none absolute inset-0" />;
}
