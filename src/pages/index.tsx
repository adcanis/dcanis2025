"use client";
import React from "react";
import gsap from "gsap";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/work/Work";
import Faq from "@/components/faq/Faq";
import Footer from "@/components/Footer";

const Home = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0.88, y: "2%" },
          {
            opacity: 1,
            y: "0%",
            duration: 0.1,
            ease: "power3.out",
          }
        );
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="home page-container">
      <Hero />
      <About />
      <Work />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
