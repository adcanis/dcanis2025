"use client";
import React from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { ScrollDetection } from "@/hooks/useScrollDetection";
import Footer from "@/components/Footer";
import Capabilities from "@/components/capabilities/Capabilities";
import Awards from "@/components/awards/Awards";
import Dots from "@/components/Dots";
import aboutImg from "@/assets/img-about.jpg";
import Statistics from "@/components/about/Statistics";
import Industries from "@/components/industries/Industries";

const About = () => {
  const controls = useAnimation();
  const scrollDirection = ScrollDetection();

  React.useEffect(() => {
    if (!scrollDirection) return;

    controls.start({
      scale: scrollDirection === "down" ? 1.1 : 0.98,
      transition: { duration: 0.35, ease: "easeOut" },
    });
  }, [controls, scrollDirection]);

  return (
    <motion.div
      className="about-container"
      initial={{ opacity: 0, z: 100 }}
      animate={{ opacity: 1, z: 0 }}
      exit={{ opacity: 0, z: -100 }}
      transition={{ duration: 1, delay: 0.75 }}
    >
      <div className="background" data-theme="light" />
      <div className="about-content">
        <div className="hero">
          <div className="left">
            <h1>
              Transforming ideas into powerful digital experiences
              <Dots />
            </h1>
          </div>
          <div className="right"></div>
        </div>
        <motion.div
          className="hero-transition-container"
          data-theme="light"
          animate={controls}
        >
          <Image
            src={aboutImg.src}
            alt="About Hero"
            width={1024}
            height={768}
          />
        </motion.div>
        <Statistics />
        <Capabilities />
      </div>
      <Industries />
      <Awards />
      <Footer />
    </motion.div>
  );
};

export default About;
