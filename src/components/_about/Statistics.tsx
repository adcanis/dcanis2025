import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const Statistics = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5vh", "150dvh"]);

  return (
    <div className="page-container mission-container" ref={containerRef}>
      <motion.div style={{ y }} className="content">
        <motion.div
          className="inner-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="stats-item">
            <h1>17</h1>
            <p>Years Experience</p>
          </div>
          <div className="stats-item">
            <h1>100+</h1>
            <p>Projects Completed</p>
          </div>
          <div className="stats-item">
            <h1>60,000</h1>
            <p>Users Served</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Statistics;
