import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import PixelBG from "../PixelBG";
import Scene from "./lib/Scene";

const Intro = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const starScale = useTransform(scrollYProgress, [0, 0.05], [1, 0.05]);

  return (
    <div className="page-container intro-container" ref={containerRef}>
      <PixelBG className="intro-pixels" cellSize={20} />
      <motion.div className="content">
        <motion.div
          className="inner-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Scene />
          <div className="section-title">
            <motion.h1 style={{ scale: starScale }}>Who I am</motion.h1>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Intro;
