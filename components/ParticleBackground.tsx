"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
};

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.16,
    vy: (Math.random() - 0.5) * 0.16,
    radius: Math.random() * 2.2 + 0.9,
    alpha: Math.random() * 0.35 + 0.15
  };
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const particleCount = Math.min(120, Math.max(46, Math.floor((width * height) / 16500)));
      particles = Array.from({ length: particleCount }, () => createParticle(width, height));
    };

    const moveMouse = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const clearMouse = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const softGradient = context.createRadialGradient(width * 0.5, height * 0.2, 20, width * 0.5, height * 0.2, Math.max(width, height) * 0.8);
      softGradient.addColorStop(0, "rgba(24, 24, 27, 0.035)");
      softGradient.addColorStop(0.45, "rgba(113, 113, 122, 0.018)");
      softGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = softGradient;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (!reducedMotion && distance < 120) {
          const force = (120 - distance) / 120;
          particle.vx += (dx / Math.max(distance, 1)) * force * 0.018;
          particle.vy += (dy / Math.max(distance, 1)) * force * 0.018;
        }

        if (!reducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= 0.992;
          particle.vy *= 0.992;
        }

        if (particle.x < -8) particle.x = width + 8;
        if (particle.x > width + 8) particle.x = -8;
        if (particle.y < -8) particle.y = height + 8;
        if (particle.y > height + 8) particle.y = -8;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(82, 82, 91, ${particle.alpha})`;
        context.fill();

        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const next = particles[nextIndex];
          const lineDx = particle.x - next.x;
          const lineDy = particle.y - next.y;
          const lineDistance = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

          if (lineDistance < 132) {
            const opacity = (1 - lineDistance / 132) * 0.08;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(next.x, next.y);
            context.strokeStyle = `rgba(82, 82, 91, ${opacity})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", moveMouse, { passive: true });
    window.addEventListener("pointerleave", clearMouse);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", moveMouse);
      window.removeEventListener("pointerleave", clearMouse);
    };
  }, []);

  return <canvas className="particle-background" ref={canvasRef} aria-hidden="true" />;
}
