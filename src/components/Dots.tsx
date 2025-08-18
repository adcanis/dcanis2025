import React from "react";
import { motion } from "framer-motion";

const Dots = () => {
  const dotVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="dot"
          variants={dotVariants}
          initial="hidden"
          animate="visible"
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        >
          .
        </motion.span>
      ))}
    </>
  );
};

export default Dots;
