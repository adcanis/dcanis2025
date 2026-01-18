"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextMaskProps {
  text: string;
  fontSize: string;
  background: string;
  color?: string;
  scale: number;
  scaleDirection: "up" | "down";
}

const TextMask = ({
  text,
  fontSize,
  background,
  color = "#0b090a",
  scale,
  scaleDirection,
}: TextMaskProps) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const starScale = useTransform(
    scrollYProgress,
    [0, 0.66],
    scaleDirection === "up" ? [1, scale] : [scale, 1]
  );

  return (
    <motion.div
      className="text-mask-wrapper"
      ref={scrollRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut",
      }}
    >
      <div className="text-mask-container" style={{ background }}>
        <motion.h1 style={{ scale: starScale, fontSize, color }}>
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default TextMask;
