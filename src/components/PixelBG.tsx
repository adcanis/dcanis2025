import React from "react";

type PixelRippleCanvasProps = {
  className?: string;
  cellSize?: number;
  decay?: number;
  strength?: number;
  maxDpr?: number;
};

export default function PixelRippleCanvas({
  className,
  cellSize = 10,
  decay = 0.9,
  strength = 1.35,
  maxDpr = 1.75,
}: PixelRippleCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const rafRef = React.useRef<number | null>(null);
  const energiesRef = React.useRef<Float32Array | null>(null);

  const colsRef = React.useRef<number>(0);
  const rowsRef = React.useRef<number>(0);

  const mouseRef = React.useRef({
    x: 0,
    y: 0,
    px: 0,
    py: 0,
    has: false,
    vx: 0,
    vy: 0,
  });

  const resize = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const rect = (parent ?? canvas).getBoundingClientRect();

    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));

    const cols = Math.max(1, Math.floor(rect.width / cellSize));
    const rows = Math.max(1, Math.floor(rect.height / cellSize));

    colsRef.current = cols;
    rowsRef.current = rows;

    energiesRef.current = new Float32Array(cols * rows);
  }, [cellSize, maxDpr]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion) return;

    resize();

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    const parent = canvas.parentElement ?? canvas;

    const handleMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const m = mouseRef.current;
      if (!m.has) {
        m.x = x;
        m.y = y;
        m.px = x;
        m.py = y;
        m.has = true;
        m.vx = 0;
        m.vy = 0;
        return;
      }

      m.px = m.x;
      m.py = m.y;
      m.x = x;
      m.y = y;
      m.vx = m.x - m.px;
      m.vy = m.y - m.py;
    };

    const handleLeave = () => {
      mouseRef.current.has = false;
    };

    window.addEventListener("mousemove", handleMove);
    parent.addEventListener("mouseleave", handleLeave);

    const render = () => {
      const ctx = canvas.getContext("2d");
      const energies = energiesRef.current;
      if (!ctx || !energies) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const cols = colsRef.current;
      const rows = rowsRef.current;
      const w = canvas.width;
      const h = canvas.height;

      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const cssW = w / dpr;
      const cssH = h / dpr;

      ctx.clearRect(0, 0, w, h);

      const m = mouseRef.current;
      if (m.has) {
        const speed = Math.min(60, Math.hypot(m.vx, m.vy));
        const boost = (speed / 60) * 0.9 + 0.1;

        const cx = Math.floor((m.x / cssW) * cols);
        const cy = Math.floor((m.y / cssH) * rows);

        const radius = 3;
        for (let oy = -radius; oy <= radius; oy++) {
          for (let ox = -radius; ox <= radius; ox++) {
            const gx = cx + ox;
            const gy = cy + oy;
            if (gx < 0 || gx >= cols || gy < 0 || gy >= rows) continue;

            const idx = gy * cols + gx;
            const dist = Math.hypot(ox, oy);
            const falloff = Math.max(0, 1 - dist / (radius + 0.001));

            energies[idx] = Math.min(
              1,
              energies[idx] + falloff * strength * boost
            );
          }
        }

        if (speed > 2) {
          const dirX = m.vx / (speed || 1);
          const dirY = m.vy / (speed || 1);

          for (let t = 1; t <= 4; t++) {
            const sx = Math.floor(cx - dirX * t);
            const sy = Math.floor(cy - dirY * t);
            if (sx < 0 || sx >= cols || sy < 0 || sy >= rows) continue;
            const idx = sy * cols + sx;
            energies[idx] = Math.min(1, energies[idx] + 0.25 * boost);
          }
        }
      }
      const cellW = (cssW / cols) * dpr;
      const cellH = (cssH / rows) * dpr;

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const idx = gy * cols + gx;
          const eVal = energies[idx];

          energies[idx] = eVal * decay;

          if (eVal < 0.01) continue;
          const a = Math.min(0.16, eVal * eVal * 0.18);

          ctx.fillStyle = `rgba(0,0,0,${a})`;

          const x = gx * cellW;
          const y = gy * cellH;
          const inset = 0.8 * dpr;
          ctx.fillRect(
            x + inset,
            y + inset,
            Math.max(0, cellW - inset * 2),
            Math.max(0, cellH - inset * 2)
          );
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMove);
      parent.removeEventListener("mouseleave", handleLeave);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [decay, resize, strength, maxDpr]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
