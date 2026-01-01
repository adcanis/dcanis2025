"use client";
import React from "react";
import { motion } from "framer-motion";
import { useMouseDetection } from "@/hooks/useMouseDetection";

interface MaskedCursorProps {
  primaryText: string;
  secondaryText: string;
  primaryColor: string;
  secondaryColor: string;
  background: string;
}

const MaskedCursor = ({
  primaryText,
  secondaryText,
  primaryColor,
  secondaryColor,
  background,
}: MaskedCursorProps) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const { x, y } = useMouseDetection();
  const size = isHovered ? 512 : 64;

  return (
    <div className="masked-cursor-container">
      <motion.div
        className="mask"
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          {primaryText}
        </p>
      </motion.div>
      <div className="mask-body">
        <p>{secondaryText}</p>
      </div>
    </div>
  );
};

export default MaskedCursor;
