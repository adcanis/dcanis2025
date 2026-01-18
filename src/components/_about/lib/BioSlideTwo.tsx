import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BioTwo from "@/assets/cap-eng.png";

const BioSlideTwo = () => {
  return (
    <motion.div
      className="bio-info-container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.33,
        ease: "easeOut",
      }}
    >
      <div className="bio-content">
        <div className="left">
          <motion.p
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
          >
            I’m most effective when I’m close to the work. Understanding
            constraints, tradeoffs, and the real-world impact of decisions. I
            don’t believe in abstract strategy disconnected from execution. If
            something can’t be built, supported, or explained clearly, it isn’t
            ready. I prefer steady momentum over spectacle, and progress that
            compounds instead of quick wins that collapse later. My role is
            often to bring calm, direction, and forward motion when things feel
            heavy.
          </motion.p>
        </div>
        <motion.div
          className="right"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
        >
          <Image
            className="bio-image"
            src={BioTwo.src}
            alt="bio photo two"
            width={1920}
            height={1080}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BioSlideTwo;
