import React from "react";
import { motion } from "framer-motion";
import Matter, {
  Engine,
  World,
  Bodies,
  Body,
  Mouse,
  MouseConstraint,
} from "matter-js";

interface FallingCodeProps {
  background?: string;
  fontColor?: string;
}

const codeSymbols = [
  "<",
  ">",
  "/",
  "\\",
  "{",
  "}",
  "[",
  "]",
  "(",
  ")",
  ";",
  ":",
  "=",
  "+",
  "-",
  "*",
  "&",
  "|",
  "!",
  "?",
  "#",
  "@",
  "$",
  "%",
  "^",
  "~",
  "`",
  '"',
  "'",
  ".",
  "</",
  "/>",
  "{}",
  "[]",
  "()",
  "==",
  "!=",
  "&&",
  "||",
  "=>",
];

const symbolSizes = [60, 80, 70, 90, 75, 85, 65, 95, 55, 100];

const FallingCode = ({ background, fontColor }: FallingCodeProps) => {
  const playgroundRef = React.useRef<HTMLDivElement | null>(null);
  const engineRef = React.useRef<Engine | null>(null);
  const bodiesRef = React.useRef<Body[]>([]);
  const rafRef = React.useRef<number | null>(null);
  const symbolRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const mouseConstraintRef = React.useRef<MouseConstraint | null>(null);
  const lastTimeRef = React.useRef(0);

  const [ready, setReady] = React.useState(false);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const container = playgroundRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const container = playgroundRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const engine = Engine.create({
      gravity: { x: 0, y: 0.8 },
    });

    const world = engine.world;
    engine.timing.timeScale = 1;

    const floor = Bodies.rectangle(width / 2, height, width, 10, {
      isStatic: true,
      restitution: 0.8,
      friction: 0.1,
      frictionStatic: 0.1,
    });

    const leftWall = Bodies.rectangle(-20, height / 2, 40, height, {
      isStatic: true,
      restitution: 0.8,
    });

    const rightWall = Bodies.rectangle(width + 20, height / 2, 40, height, {
      isStatic: true,
      restitution: 0.8,
    });

    World.add(world, [floor, leftWall, rightWall]);

    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.8,
        render: { visible: false },
      },
    });

    World.add(world, mouseConstraint);
    mouseConstraintRef.current = mouseConstraint;

    const bodies: Body[] = [];

    codeSymbols.forEach((_, index) => {
      const size = symbolSizes[index % symbolSizes.length] ?? 70;
      const x = width * 0.1 + Math.random() * width * 0.8;
      const y = -height * 0.3 - Math.random() * height * 0.7;

      const body = Bodies.rectangle(x, y, size, size, {
        restitution: 0.85,
        friction: 0.001,
        frictionAir: 0.005,
        density: 0.001,
        render: {
          fillStyle: "transparent",
        },
      });

      Body.setAngle(body, Math.random() * Math.PI * 2);
      bodies.push(body);
    });

    World.add(world, bodies);

    engineRef.current = engine;
    bodiesRef.current = bodies;
    setReady(true);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      Engine.clear(engine);
      engineRef.current = null;
      bodiesRef.current = [];
      mouseConstraintRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (!inView || !engineRef.current) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const step = (time: number) => {
      const engine = engineRef.current;
      if (!engine) return;

      const last = lastTimeRef.current || time;
      const delta = time - last;
      lastTimeRef.current = time;

      const clampedDelta = Math.min(delta || 16.67, 16.67);
      Matter.Engine.update(engine, clampedDelta);

      bodiesRef.current.forEach((body, i) => {
        const el = symbolRefs.current[i];
        if (!el) return;

        const { x, y } = body.position;
        const angle = body.angle;

        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle}rad)`;
        el.style.willChange = "transform";
      });

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [inView]);

  return (
    <motion.div
      className="playground"
      ref={playgroundRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
      style={{
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {ready &&
        codeSymbols.map((symbol, index) => {
          const size = symbolSizes[index % symbolSizes.length] ?? 70;

          return (
            <motion.div
              key={`symbol-${index}`}
              className="code-symbol"
              ref={(el) => {
                symbolRefs.current[index] = el;
              }}
              style={
                {
                  width: `${size}px`,
                  height: `${size}px`,
                  color: fontColor || "#0b090a",
                  background: background || "#f5f7ff",
                  fontSize: `${size * 0.6}px`,
                } as React.CSSProperties
              }
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      scale: 0.7,
                    }
              }
              transition={{
                duration: 0.6,
                delay: 0,
                type: "spring",
                bounce: 0.3,
              }}
            >
              {symbol}
            </motion.div>
          );
        })}
    </motion.div>
  );
};

export default FallingCode;
