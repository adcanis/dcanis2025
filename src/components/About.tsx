import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="about-comp-container" data-theme="light">
      <div className="about-comp-content">
        <div className="about-comp-header">
          <div className="left">
            <motion.p
              initial={{
                opacity: 0.75,
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              }}
              whileInView={{
                opacity: 1,
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Helping design digital products to <span>power</span> the future
            </motion.p>
          </div>
          <div className="right">
            <motion.p
              initial={{
                opacity: 0,
                transform: "scale(1.01)",
              }}
              whileInView={{
                opacity: 1,
                transform: "scale(1.02)",
              }}
              transition={{ duration: 0.25, delay: 0.1 }}
            >
              Driven by curiosity and new technologies, I am continuously
              pushing the boundaries to create immersive, emotional and joyful
              experiences that blur the lines of reality through imagery and 3D
              animations
            </motion.p>
          </div>
        </div>
        <motion.div
          className="intro-btn-container"
          initial={{
            opacity: 0,
            transform: "scale(1.01)",
          }}
          whileInView={{
            opacity: 1,
            transform: "scale(1.02)",
          }}
          transition={{ duration: 0.25, delay: 0.5 }}
        >
          <Link className="intro-btn" href="/about">
            <p>About me</p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
