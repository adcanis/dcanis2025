import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const Credits = () => {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.75 }}
    >
      <div className="credits-content">
        <h1>Credits</h1>
        <p>This project was a long time in the making, and I</p>
        <h3>3D Assets</h3>
        <h4> - Ghost in the Shell Cyborg Head</h4>
        <div className="credits-item">
          <p>
            This work is based on{" "}
            <a
              href="https://sketchfab.com/3d-models/ghost-in-the-shell-cyborg-head-7a3ad0a509a746b5acaf206d638a2d8a"
              target="_blank"
              rel="noopener noreferrer"
            >
              “Ghost in the Shell Cyborg Head”
            </a>{" "}
            by{" "}
            <a
              href="https://sketchfab.com/nikars"
              target="_blank"
              rel="noopener noreferrer"
            >
              PolyBoi
            </a>
            , licensed under{" "}
            <a
              href="http://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC-BY-4.0
            </a>
            .
          </p>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Credits;
