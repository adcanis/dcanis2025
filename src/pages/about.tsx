import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/_about/Hero";
import Intro from "@/components/_about/Intro";
import Mission from "@/components/_about/Mission";
import WhoIAm from "@/components/_about/WhoIAm";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, z: 100 }}
      animate={{ opacity: 1, z: 0 }}
      exit={{ opacity: 0, z: -100 }}
      transition={{ duration: 1, delay: 0.75 }}
    >
      <Hero />
      <Intro />
      <WhoIAm />
      <Footer />
    </motion.div>
  );
};

export default About;
