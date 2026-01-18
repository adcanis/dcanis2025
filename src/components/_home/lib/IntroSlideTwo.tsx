import React from "react";
import { motion } from "framer-motion";

const IntroSlideTwo = () => {
  return (
    <motion.div
      className="mission-container "
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.33,
        ease: "easeOut",
      }}
    >
      <div className="mission-content second">
        <h1 id="middle">ZERO</h1>
      </div>
    </motion.div>
  );
};

export default IntroSlideTwo;
