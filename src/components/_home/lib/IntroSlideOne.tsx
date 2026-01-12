import React from "react";
import { motion } from "framer-motion";
import ScrollText from "@/components/text-effects/ScrollText";

const IntroSlideOne = () => {
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
      <div className="mission-content first">
        <ScrollText
          text="I help organizations turn complexity into clarity. Designing and building digital systems that create real, measurable growth."
          color="#e3e8eb"
          fontSize="5em"
        />
      </div>
    </motion.div>
  );
};

export default IntroSlideOne;
