import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BioTwo from "@/assets/about-2.jpg";

const BioSlideThree = () => {
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
            I’ve spent most of my career inside large systems, growing teams,
            unclear requirements, and decisions made under pressure. Over time,
            I{"'"}ve learned that most problems aren’t technical. They’re
            <span>structural</span>.
            <br />
            When systems fail, it’s rarely because of bad code, it’s because
            direction was unclear, ownership was missing, or decisions were
            avoided. My instinct is always the same. Step back, find the signal,
            and simplify before moving forward.
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

export default BioSlideThree;
