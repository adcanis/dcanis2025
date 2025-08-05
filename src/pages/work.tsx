"use client";
import React from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import Archives from "@/components/archives/Archives";
import Footer from "@/components/Footer";
import { FeatData } from "@/components/work/lib/FeatData";

const Work = () => {
  const [selectedFilter, setSelectedFilter] = React.useState<string>("All");
  const [counts, setCounts] = React.useState({
    All: FeatData.length,
    "Digital Products": FeatData.filter((item) =>
      item.category.includes("Digital Products")
    ).length,
    Design: FeatData.filter((item) => item.category.includes("Design")).length,
    Development: FeatData.filter((item) =>
      item.category.includes("Development")
    ).length,
  });

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
            <h1>bringing your boldest ideas to life</h1>
          </div>
          <div className="right"></div>
        </div>
        <div className="work-items-container">
          <div className="filters">
            <button
              className={
                selectedFilter === "All" ? "btn-black" : "btn-transparent"
              }
              type="button"
              onClick={() => setSelectedFilter("All")}
            >
              All Work
            </button>
            <button
              className={
                selectedFilter === "Digital Products"
                  ? "btn-black"
                  : "btn-transparent"
              }
              type="button"
              onClick={() => setSelectedFilter("Digital Products")}
            >
              Digital Products
              <span className="count">{counts["Digital Products"]}</span>
            </button>
            <button
              className={
                selectedFilter === "Design" ? "btn-black" : "btn-transparent"
              }
              type="button"
              onClick={() => setSelectedFilter("Design")}
            >
              Design
              <span className="count">{counts.Design}</span>
            </button>
            <button
              className={
                selectedFilter === "Development"
                  ? "btn-black"
                  : "btn-transparent"
              }
              type="button"
              onClick={() => setSelectedFilter("Development")}
            >
              Development
              <span className="count">{counts.Development}</span>
            </button>
          </div>
        </div>
      </div>
      <Archives />
      <Footer />
    </motion.div>
  );
};

export default Work;
