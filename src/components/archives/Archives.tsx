import React from "react";
import { motion } from "framer-motion";
import { ArchiveData } from "./lib/ArchiveData";

const Archives = () => {
  return (
    <motion.div
      className="archives-container"
      data-theme="dark"
      initial={{ opacity: 0, z: 100 }}
      whileInView={{ opacity: 1, z: 0 }}
      exit={{ opacity: 0, z: -100 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <div className="archives-content">
        <h1 className="archives-title">Archive</h1>
        <div className="archives-list">
          {ArchiveData.map((archive) => (
            <div key={archive.id} className="archive-item">
              <h2 className="archive-title">{archive.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Archives;
