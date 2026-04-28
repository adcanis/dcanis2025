import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Matter, {
  Engine,
  World,
  Bodies,
  Body,
  Mouse,
  MouseConstraint,
} from "matter-js";
import { AwardsData } from "@/lib/AwardsData";

const awardSizes = [124, 156, 200, 224, 256];
const mobileAwardSizes = [64, 80, 96, 112, 128];

// Expand awards by count, then shuffle
const getRandomizedAwards = () => {
  const expanded: typeof AwardsData = [];
  AwardsData.forEach((award) => {
    for (let i = 0; i < award.count; i++) {
      expanded.push({ ...award, _instance: i });
    }
  });
  // Shuffle
  for (let i = expanded.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [expanded[i], expanded[j]] = [expanded[j], expanded[i]];
  }
  return expanded;
};

const AwardsMatter = () => {
  const playgroundRef = React.useRef<HTMLDivElement | null>(null);
  const engineRef = React.useRef<Engine | null>(null);
  const bodiesRef = React.useRef<Body[]>([]);
  const rafRef = React.useRef<number | null>(null);
  const mouseConstraintRef = React.useRef<MouseConstraint | null>(null);
  const lastTimeRef = React.useRef(0);
  const [screenSize, setScreenSize] = React.useState<number>(window.innerWidth);

  const randomizedAwards = React.useMemo(() => getRandomizedAwards(), []);

  const frozeRef = React.useRef(false);
  const settledForMsRef = React.useRef(0);

  const [ready, setReady] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const [awardRefs] = React.useState<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const updateSize = () => {
      setScreenSize(window.innerWidth);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

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
      },
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
      gravity: { x: 0, y: 0.15 },
    });

    const world = engine.world;
    engine.timing.timeScale = 1;

    const floor = Bodies.rectangle(width / 2, height + 5, width, 10, {
      isStatic: true,
      restitution: 0.3,
      friction: 0.3,
      frictionStatic: 0.3,
    });

    const ceiling = Bodies.rectangle(width / 2, -5, width, 10, {
      isStatic: true,
      restitution: 0.3,
    });

    const leftWall = Bodies.rectangle(-5, height / 2, 10, height, {
      isStatic: true,
      restitution: 0.3,
    });

    const rightWall = Bodies.rectangle(width - 25, height / 2, 10, height, {
      isStatic: true,
      restitution: 0.3,
    });

    World.add(world, [floor, ceiling, leftWall, rightWall]);

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

    randomizedAwards.forEach((_, index) => {
      const sizes = screenSize <= 1100 ? mobileAwardSizes : awardSizes;
      const size = sizes[index % sizes.length] ?? 85;
      const x = width * 0.1 + Math.random() * width * 0.8;
      const y = height - size / 2 - 10;

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

    frozeRef.current = false;
    settledForMsRef.current = 0;

    setReady(true);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      Engine.clear(engine);
      engineRef.current = null;
      bodiesRef.current = [];
      mouseConstraintRef.current = null;

      frozeRef.current = false;
      settledForMsRef.current = 0;
    };
  }, [randomizedAwards]);

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
        const el = awardRefs[i];
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
  }, [inView, awardRefs]);

  return (
    <motion.div
      className="playground"
      ref={playgroundRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        pointerEvents: "all",
        zIndex: 1,
      }}
    >
      {ready &&
        randomizedAwards.map((award, index) => {
          const sizes = screenSize <= 1100 ? mobileAwardSizes : awardSizes;
          const size = sizes[index % sizes.length] ?? 85;
          return (
            <motion.div
              key={`award-${award.id}-${award._instance ?? 0}-${index}`}
              className="award-icon"
              id={award.name.trim().toLowerCase().replace(/\s+/g, "-")}
              ref={(el) => {
                awardRefs[index] = el;
              }}
              style={
                {
                  width: `${size}px`,
                  height: `${size}px`,
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
              <Image
                src={award.icon}
                alt={award.name}
                width={size - 24}
                height={size - 24}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </motion.div>
          );
        })}
    </motion.div>
  );
};

export default AwardsMatter;
