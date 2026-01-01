import React from "react";
import { motion } from "framer-motion";
import Scene from "./Scene";

const BioSlideOne = () => {
  return (
    <motion.div
      className="bio-scene-container"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.33,
        ease: "easeOut",
      }}
    >
      <Scene />
    </motion.div>
  );
};

export default BioSlideOne;
