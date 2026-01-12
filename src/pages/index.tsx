"use client";
import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/_home/Hero";
import Intro from "@/components/_home/Intro";
import About from "@/components/_home/About";
import Services from "@/components/_home/Services";
import ContactCard from "@/components/ContactCard";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.75 }}
    >
      <Hero />
      <About />
      <Intro />
      <Services />
      <ContactCard />
      <Footer />
    </motion.div>
  );
};

export default Home;
