import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/_about/Hero";
import Summary from "@/components/_about/Summary";
import WhoIAm from "@/components/_about/WhoIAm";
import Awards from "@/components/_about/Awards";
import Footer from "@/components/Footer";
import ContactCard from "@/components/ContactCard";

const About = () => {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.75 }}
    >
      <Hero />
      <Summary />
      <WhoIAm />
      <Awards />
      <ContactCard />
      <Footer />
    </motion.div>
  );
};

export default About;
