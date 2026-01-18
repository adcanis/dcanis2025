import React from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import PixelBG from "../PixelBG";
import Logo from "@/assets/logo.jpg";
import { GoArrowDownRight } from "react-icons/go";

const Hero = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [screenSize, setScreenSize] = React.useState<number>(window.innerWidth);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150dvh"]);
  const starRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const starScale = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  React.useEffect(() => {
    const updateSize = () => {
      setScreenSize(window.innerWidth);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  React.useEffect(() => {
    if (screenSize <= 768) {
      const hasReloaded = sessionStorage.getItem("mobileReloaded");

      if (!hasReloaded) {
        sessionStorage.setItem("mobileReloaded", "true");
        window.location.reload();
      }
    }
  }, [screenSize]);

  return (
    <div className="page-container services-hero" ref={containerRef}>
      <PixelBG className="hero-pixels" cellSize={20} />
      <motion.div style={{ y }} className="content">
        {screenSize >= 768 ? (
          <motion.div
            className="text-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.66, delay: 0.8, ease: "easeOut" }}
          >
            <h1 className="hero-title">
              G<span className="oo">oo</span>d sh
              <motion.span
                className="star"
                style={{ rotate: starRotate, scale: starScale }}
              >
                *
              </motion.span>
              t
            </h1>
          </motion.div>
        ) : (
          <motion.div
            className="slogan"
            style={{ scale: screenSize >= 768 ? starScale : 1 }}
          >
            <span>
              <Image src={Logo.src} alt="Logo" width={115} height={115} />
            </span>
            <p>Making</p>
            <p>
              really{" "}
              <span>
                <GoArrowDownRight />
              </span>
            </p>
            <p>good sh*t. </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Hero;
