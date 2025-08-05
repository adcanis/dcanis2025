import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import gsap from "gsap";
import ScrollDownBtn from "./ScrollDownBtn";
import CubesAnimation from "@/assets/lottie/design.json";

const Hero = () => {
  const lottieRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLHeadingElement>(null);

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        lottieRef.current,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
        "+=0.5"
      );

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "+=0.5"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      className="hero-container"
      data-theme="light"
      initial={{ opacity: 0, z: 100 }}
      animate={{ opacity: 1, z: 0 }}
      exit={{ opacity: 0, z: -100 }}
      transition={{ duration: 1, delay: 0.75 }}
    >
      <Lottie
        className="hero-animation"
        animationData={CubesAnimation}
        loop={false}
        autoplay={true}
        preload="true"
        ref={lottieRef}
      />
      <div className="hero-content">
        <h1 ref={textRef}>
          Creative
          <br />
          Software Engineer
          <br />& Designer
        </h1>
      </div>
      <ScrollDownBtn />
    </motion.div>
  );
};

export default Hero;
