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
    <div className="page-container home-hero" ref={containerRef}>
      <PixelBG className="hero-pixels" cellSize={20} />
      <motion.div style={{ y }} className="content">
        <motion.div
          className="slogan"
          style={{ scale: screenSize >= 768 ? starScale : 1 }}
        >
          <span>
            {screenSize >= 768 ? (
              <GoArrowDownRight />
            ) : (
              <Image src={Logo.src} alt="Logo" width={115} height={115} />
            )}
          </span>
          <p>Build. Lead.</p>
          <p>Deliver.</p>
        </motion.div>
        <div className="text-container">
          {screenSize >= 768 ? (
            <h1 className="hero-title">
              Diki
              <motion.span className="oo star" style={{ scale: starScale }}>
                an
              </motion.span>
              idis
            </h1>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
