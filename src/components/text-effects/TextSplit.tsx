import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface TextSplitProps {
  text: string;
  text2: string;
  color: string;
  fontSize: string;
  imageSrc: string;
}

const anim = {
  initial: { width: 0 },
  open: {
    width: "auto",
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
  closed: { width: 0 },
};

const TextSplit = ({
  text,
  text2,
  color,
  fontSize,
  imageSrc,
}: TextSplitProps) => {
  const [isActive, setIsActive] = React.useState<boolean>(false);

  return (
    <div
      className="text-split-container"
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setIsActive(false);
      }}
    >
      <p style={{ color, fontSize }}>{text}</p>
      <motion.div
        className="text-split-img-container"
        variants={anim}
        animate={isActive ? "open" : "closed"}
      >
        <Image
          src={imageSrc || ""}
          alt="Text Split Image"
          width={512}
          height={256}
        />
      </motion.div>
      <p style={{ color, fontSize }}>{text2}</p>
    </div>
  );
};

export default TextSplit;
