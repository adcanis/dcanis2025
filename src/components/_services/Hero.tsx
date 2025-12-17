import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import PixelBG from "../PixelBG";

const Hero = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150dvh"]);
  const starRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const starScale = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div className="page-container services-hero" ref={containerRef}>
      <PixelBG className="hero-pixels" cellSize={20} />
      <motion.div style={{ y }} className="content">
        <motion.div
          className="text-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.66, delay: 0.8, ease: "easeOut" }}
        >
          <h1 className="hero-title">
            G<span className="oo">oo</span>d sh
            <motion.span
              className="star"
              style={{ rotate: starRotate, scale: starScale }}
            >
              *
            </motion.span>
            t
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
