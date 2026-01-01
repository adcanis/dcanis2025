import React from "react";
import { motion, useScroll } from "framer-motion";

interface CurvedTextProps {
  text: string;
  color: string;
}

const CurvedText: React.FC<CurvedTextProps> = ({ text, color }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const pathsRef = React.useRef<(SVGTextPathElement | null)[]>([]);
  const curveId = React.useId();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (e) => {
      pathsRef.current.forEach((path, i) => {
        if (!path) return;
        path.setAttribute("startOffset", `${-60 + i * 60 + e * 60}%`);
      });
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <motion.div
      className="curved-text-container"
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.6,
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <svg className="curved-text-svg" viewBox="0 0 500 180">
        <path
          fill="none"
          id={curveId}
          d="m0,177c122.74,0,123-136,253-136,116,0,102,136,246,136"
        />

        <text className="curved-text" style={{ fill: color }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <textPath
              key={i}
              ref={(el) => {
                pathsRef.current[i] = el;
              }}
              startOffset={`${i * 60}%`}
              href={`#${curveId}`}
            >
              {text}
            </textPath>
          ))}
        </text>
      </svg>
    </motion.div>
  );
};

export default CurvedText;
