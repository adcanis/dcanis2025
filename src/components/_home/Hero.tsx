import React from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Scene from "../hero/Scene";
import ScrollDownBtn from "../ScrollDownBtn";
import CodeLines from "@/assets/lottie/code.json";

const Hero = () => {
  const textRefs = React.useRef<HTMLHeadingElement[]>([]);
  textRefs.current = [];

  const [introText] = React.useState([
    "Beyond",
    "The",
    "Possible",
    // "Consultant",
  ]);

  const addToRefs = (el: HTMLHeadingElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        textRefs.current,
        { opacity: 0, y: 5 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.5,
        },
        "+=0.5"
      );

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 769px)",
          isMobile: "(max-width: 768px)",
        },
        (context) => {
          const { isDesktop, isMobile } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
          };

          tl.to(
            textRefs.current[1],
            {
              marginLeft: isDesktop ? "150px" : "50px",
              duration: 0.6,
              ease: "power2.out",
            },
            3.25
          );
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      className="section-container"
      data-theme="light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <div className="body-container">
        <p>Hero goes here</p>
      </div>
    </motion.div>
  );
};

export default Hero;
