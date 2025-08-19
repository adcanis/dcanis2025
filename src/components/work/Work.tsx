import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimation,
  useScroll,
  useVelocity,
} from "framer-motion";
import { ScrollDetection } from "@/hooks/useScrollDetection";
import { FeatData } from "./lib/Data";

const IMG_W = 512;
const IMG_H = 512;

const getCurvePath = (c: number) =>
  `M0,0 C 25,${c} 75,${c} 100,0 L100,20 L0,20 Z`;

const Work = () => {
  const router = useRouter();
  const controls = useAnimation();
  const scrollDirection = ScrollDetection();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [activeImg, setActiveImg] = React.useState<string | null>(null);
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const curveMV = useMotionValue(0);
  const springX = useSpring(mouseX);
  const springY = useSpring(mouseY);

  const { scrollY } = useScroll();
  const rawVel = useVelocity(scrollY);

  const smoothVel = useSpring(rawVel, {
    stiffness: 40,
    damping: 22,
    mass: 0.9,
  });

  const velToDepth = useTransform(
    smoothVel,
    [-2500, -1200, 0, 1200, 2500],
    [10, 10, 10, 25, 25]
  );

  const curve = useSpring(curveMV, {
    stiffness: 120,
    damping: 24,
    mass: 0.9,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  const curvePath = useTransform(curve, (v) => getCurvePath(v));

  React.useEffect(() => {
    const unsub = velToDepth.on("change", (depth) => {
      curveMV.set(depth);
    });
    return () => unsub();
  }, [velToDepth, curveMV]);

  React.useEffect(() => {
    if (!scrollDirection) return;

    const base = curveMV.get();
    if (scrollDirection === "down") {
      curveMV.set(base + 2);
      requestAnimationFrame(() => curveMV.set(base));
    } else {
      curveMV.set(base - 2);
      requestAnimationFrame(() => curveMV.set(base));
    }
  }, [scrollDirection, curveMV]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setActiveImg("");
        setIsHovered(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const positionOverRow = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const rowRect = (
      e.currentTarget as HTMLTableRowElement
    ).getBoundingClientRect();

    const x = e.clientX - containerRect.left - IMG_W / 2;
    const y = rowRect.top - containerRect.top + (rowRect.height - IMG_H) / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = (imgSrc?: string) => {
    if (imgSrc) {
      setActiveImg(imgSrc);
      setIsHovered(true);
    } else {
      setIsHovered(false);
      setActiveImg(null);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => setActiveImg(null), 160);
  };

  return (
    <motion.div
      className="work-comp-container"
      data-theme="light"
      animate={controls}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        className="work-comp-content"
        ref={containerRef}
        onMouseLeave={handleMouseLeave}
      >
        <div className="work-comp-header">
          <h6>Recent Work</h6>
        </div>
        <table className="feat-work-table">
          <tbody>
            {FeatData.map((item) => (
              <tr
                key={item.id}
                onMouseEnter={() => handleMouseEnter(item.featuredImg)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={positionOverRow}
              >
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="view-all-container">
          <button
            className="btn-transparent"
            type="button"
            onClick={() => router.push("/work")}
          >
            More Work
          </button>
        </div>
        <motion.div
          className="hover-img"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.25 }}
        >
          <Image
            src={activeImg || ""}
            alt="Hover Background"
            width={512}
            height={512}
            draggable={false}
          />
        </motion.div>
      </div>
      <motion.svg
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -1,
          width: "100%",
          height: 100,
          pointerEvents: "none",
          display: "block",
        }}
      >
        <motion.path fill="#1a1a1a" d={curvePath} />
      </motion.svg>
    </motion.div>
  );
};

export default Work;
