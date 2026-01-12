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
  const starScale = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div className="page-container home-hero" ref={containerRef}>
      <PixelBG className="hero-pixels" cellSize={20} />
      <motion.div style={{ y }} className="content">
        <div className="text-container">
          <h1 className="hero-title">
            Diki
            <motion.span className="oo star" style={{ scale: starScale }}>
              an
            </motion.span>
            idis
          </h1>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
