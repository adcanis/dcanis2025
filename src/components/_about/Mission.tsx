import React from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

const Mission = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5vh", "10dvh"]);

  const text =
    "“My mission is to help create the next generation of design leaders who think differently, challenge boldly, and create with purpose.”";

  const words = React.useMemo(() => text.split(" "), [text]);

  return (
    <div className="page-container mission-container" ref={containerRef}>
      <motion.div style={{ y }} className="content">
        <motion.div
          className="inner-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>
            {words.map((w, i) => (
              <span key={`${w}-${i}`}>
                {w}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Mission;
