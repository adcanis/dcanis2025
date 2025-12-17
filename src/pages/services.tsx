import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/_services/Hero";
import Expertise from "@/components/_services/Expertise";
import Interlude from "@/components/_services/Interlude";
import Leadership from "@/components/_services/Leadership";
import Industries from "@/components/_services/Industries";
import Footer from "@/components/Footer";

const Services = () => {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, z: 100 }}
      animate={{ opacity: 1, z: 0 }}
      exit={{ opacity: 0, z: -100 }}
      transition={{ duration: 1, delay: 0.75 }}
    >
      <Hero />
      <Expertise />
      <Interlude />
      <Leadership />
      <Industries />
      <Footer />
    </motion.div>
  );
};

export default Services;
