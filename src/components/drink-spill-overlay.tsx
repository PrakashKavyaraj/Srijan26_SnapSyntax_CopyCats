"use client";

import { useEffect, useRef } from "react";
import { DrinkVariant } from "@/types/drink";

interface DrinkSpillOverlayProps {
  activeVariant: DrinkVariant;
  isSpilled: boolean;
  onReset?: () => void;
}

interface SplatterDrop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  dripSpeed: number;
  dripLength: number;
  maxDrip: number;
}

export function DrinkSpillOverlay({ activeVariant, isSpilled }: DrinkSpillOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splattersRef = useRef<SplatterDrop[]>([]);
  const waveProgressRef = useRef(0);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;

    const setupCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
      ctx.scale(dpr, dpr);
    };

    setupCanvas();
    window.addEventListener("resize", setupCanvas);

    // When spill triggers, generate splash droplet clusters radiating from the can position
    if (isSpilled) {
      waveProgressRef.current = 0;
      const canCenterX = cssWidth > 768 ? cssWidth * 0.68 : cssWidth * 0.5;
      const canCenterY = cssHeight * 0.45;

      const drops: SplatterDrop[] = [];
      const dropCount = 55;

      for (let i = 0; i < dropCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.pow(Math.random(), 0.75) * Math.max(cssWidth, cssHeight) * 0.75;
        const targetX = canCenterX + Math.cos(angle) * dist;
        const targetY = canCenterY + Math.sin(angle) * dist;

        drops.push({
          x: targetX,
          y: targetY,
          radius: 0,
          maxRadius: 14 + Math.random() * 45,
          alpha: 0.85 + Math.random() * 0.15,
          dripSpeed: 0.5 + Math.random() * 1.6,
          dripLength: 0,
          maxDrip: 25 + Math.random() * 120,
        });
      }
      splattersRef.current = drops;
    } else {
      splattersRef.current = [];
      waveProgressRef.current = 0;
      ctx.clearRect(0, 0, cssWidth, cssHeight);
    }

    const render = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      if (isSpilled) {
        // 1. Spreading Liquid Fluid Wave
        if (waveProgressRef.current < 1) {
          waveProgressRef.current += 0.02;
        }

        const canCenterX = cssWidth > 768 ? cssWidth * 0.68 : cssWidth * 0.5;
        const canCenterY = cssHeight * 0.45;
        const maxWaveRadius = Math.hypot(cssWidth, cssHeight) * 1.15;
        const currentRadius = waveProgressRef.current * maxWaveRadius;

        // Draw organic spreading fluid wave
        if (currentRadius > 0) {
          ctx.save();
          ctx.beginPath();
          const points = 40;
          for (let i = 0; i <= points; i++) {
            const theta = (i / points) * Math.PI * 2;
            const noise = Math.sin(theta * 5 + waveProgressRef.current * 10) * 45;
            const r = Math.max(0, currentRadius + noise);
            const px = canCenterX + Math.cos(theta) * r;
            const py = canCenterY + Math.sin(theta) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          // Liquid gradient
          const waveGrad = ctx.createRadialGradient(
            canCenterX,
            canCenterY,
            currentRadius * 0.15,
            canCenterX,
            canCenterY,
            currentRadius
          );
          waveGrad.addColorStop(0, `hsl(${activeVariant.themeColor} / 0.42)`);
          waveGrad.addColorStop(0.5, `hsl(${activeVariant.themeColor} / 0.28)`);
          waveGrad.addColorStop(0.9, `hsl(${activeVariant.themeColor} / 0.5)`);
          waveGrad.addColorStop(1, `hsl(${activeVariant.themeColor} / 0)`);
          ctx.fillStyle = waveGrad;
          ctx.fill();

          // Frothy fluid edge
          ctx.lineWidth = 5;
          ctx.strokeStyle = `hsl(${activeVariant.themeColor} / 0.75)`;
          ctx.stroke();
          ctx.restore();
        }

        // 2. Liquid Splatter Droplets and Screen Drips
        splattersRef.current.forEach((drop) => {
          if (drop.radius < drop.maxRadius) {
            drop.radius += (drop.maxRadius - drop.radius) * 0.18;
          }

          if (drop.dripLength < drop.maxDrip) {
            drop.dripLength += drop.dripSpeed;
          }

          ctx.save();

          // Main splash blob
          ctx.fillStyle = `hsl(${activeVariant.themeColor} / ${drop.alpha})`;
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
          ctx.fill();

          // Drip stream
          if (drop.dripLength > 4) {
            ctx.beginPath();
            ctx.moveTo(drop.x - drop.radius * 0.4, drop.y);
            ctx.lineTo(drop.x + drop.radius * 0.4, drop.y);
            ctx.lineTo(drop.x + drop.radius * 0.25, drop.y + drop.dripLength);
            ctx.arc(
              drop.x,
              drop.y + drop.dripLength,
              drop.radius * 0.35,
              0,
              Math.PI
            );
            ctx.lineTo(drop.x - drop.radius * 0.25, drop.y + drop.dripLength);
            ctx.closePath();
            ctx.fill();
          }

          // Specular water reflection highlight
          ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
          ctx.beginPath();
          ctx.arc(
            drop.x - drop.radius * 0.3,
            drop.y - drop.radius * 0.3,
            drop.radius * 0.24,
            0,
            Math.PI * 2
          );
          ctx.fill();

          ctx.restore();
        });
      }

      animIdRef.current = requestAnimationFrame(render);
    };

    animIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", setupCanvas);
    };
  }, [isSpilled, activeVariant]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
        isSpilled ? "opacity-100" : "opacity-0"
      }`}
      style={{ zIndex: 12 }}
    />
  );
}
