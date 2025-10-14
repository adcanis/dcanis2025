import React from "react";
import { motion } from "framer-motion";

const Statistics = () => {
  return (
    <motion.div
      className="statistics-container"
      data-theme="light"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
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
  );
};

export default Statistics;
