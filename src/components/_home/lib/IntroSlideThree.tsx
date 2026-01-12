import React from "react";
import { motion } from "framer-motion";

const IntroSlideThree = () => {
  return (
    <motion.div
      className="mission-container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.33,
        ease: "easeOut",
      }}
    >
      <div className="mission-content third">
        <h1 id="name">COMPROMISE</h1>
      </div>
    </motion.div>
  );
};

export default IntroSlideThree;
