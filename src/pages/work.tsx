"use client";
import React from "react";
import { motion } from "framer-motion";
import Archives from "@/components/work/archives/Archives";
import Footer from "@/components/Footer";
import FeatWork from "@/components/work/FeatWork";
import WorkFilters from "@/components/work/WorkFilters";
import Dots from "@/components/Dots";

const Work = () => {
  const [selectedFilter, setSelectedFilter] = React.useState<string>("All");

  return (
    <motion.div
      className="work-container"
      data-theme="light"
      initial={{ opacity: 0, z: 100 }}
      animate={{ opacity: 1, z: 0 }}
      exit={{ opacity: 0, z: -100 }}
      transition={{ duration: 1, delay: 0.75 }}
    >
      <div className="background" data-theme="light" />
      <div className="work-content" data-theme="light">
        <div className="hero">
          <div className="left">
            <h1>
              Turning ambition into product
              <Dots />
            </h1>
          </div>
          <div className="right">
            <div className="current-role-container">
              <h3>Current Role</h3>
              <p>
                Senior Software Developer <span>@</span>Perennia Food and
                Agriculture
              </p>
            </div>
            <WorkFilters
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </div>
        </div>
        <div className="work-items-container">
          <FeatWork selectedFilter={selectedFilter} />
        </div>
      </div>
      <Archives />
      <Footer />
    </motion.div>
  );
};

export default Work;
