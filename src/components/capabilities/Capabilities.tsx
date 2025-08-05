import React from "react";
import { motion } from "framer-motion";
import { CapData } from "./lib/CapData";

const Capabilities = () => {
  return (
    <motion.div
      className="capabilities-container"
      data-theme="dark"
      initial={{ opacity: 0, z: 100 }}
      whileInView={{ opacity: 1, z: 0 }}
      exit={{ opacity: 0, z: -100 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <div className="capabilities-content">
        <h1 className="capabilities-title">Capabilities</h1>
        <div className="capabilities-list">
          {CapData.map((capability) => (
            <div key={capability.id} className="capability-item">
              <h2 className="capability-title">{capability.title}</h2>
              <ul className="capability-options">
                {capability.options.map((option) => (
                  <li key={option.id} className="capability-option">
                    {option.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Capabilities;
