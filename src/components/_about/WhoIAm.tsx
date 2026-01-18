import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextMask from "../text-effects/TextMask";
import HorizontalSection from "../HorizontalSection";
import BioSlideOne from "./lib/BioSlideOne";
import BioSlideTwo from "./lib/BioSlideTwo";
import BioSlideThree from "./lib/BioSlideThree";
import * as MdIcons from "react-icons/md";

const WhoIAm = () => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [screenSize, setScreenSize] = React.useState<number>(window.innerWidth);
  const [showIntroClip, setShowIntroClip] = React.useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 95%", "end start"],
  });

  const starScale = useTransform(scrollYProgress, [0, 0.3], [-0.25, 1]);

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

  return (
    <div className="page-container who-i-am-container">
      {screenSize <= 768 ? (
        <div className="mobile-who-i-am-intro-wrapper">
          <motion.h1>
            <span>
              <MdIcons.MdArrowForward />
            </span>
            Who I am
          </motion.h1>
        </div>
      ) : (
        <TextMask
          text="Who I Am"
          fontSize={
            screenSize >= 1920
              ? "20rem"
              : screenSize >= 1280
                ? "15rem"
                : screenSize >= 768
                  ? "12rem"
                  : "4rem"
          }
          background="#f5f7ff"
          scale={
            screenSize >= 1920
              ? 50
              : screenSize >= 1280
                ? 40
                : screenSize >= 768
                  ? 45
                  : 75
          }
          scaleDirection="up"
        />
      )}
      <div className="section-container content" ref={scrollRef}>
        <motion.div
          className="about-intro"
          style={{ scale: screenSize < 768 ? 1 : starScale }}
        >
          <div className="about-intro-text">
            <span id="quote">{'"'}</span>I{"'"}m a builder first. Building
            systems, teams and ideas that actually work. With
            <span
              id="intro-hover-point"
              onMouseEnter={() => setShowIntroClip(true)}
              onMouseLeave={() => setShowIntroClip(false)}
            >
              17+ yrs
              <span id="hover-item">
                {showIntroClip && (
                  <video autoPlay muted loop playsInline>
                    <source src="/video/intro-vid.mp4" type="video/mp4" />
                  </video>
                )}
              </span>
            </span>{" "}
            in development and leadership, I don{"'"}t chase trends or noise. I
            focus on execution and outcomes.
            <span id="quote">{'"'}</span>
          </div>
        </motion.div>
      </div>
      {screenSize <= 768 ? (
        <div className="mobile-who-i-am-wrapper">
          <BioSlideOne />
          <BioSlideTwo />
          <BioSlideThree />
        </div>
      ) : (
        <div className="horizontal-section-wrapper">
          <HorizontalSection>
            <div className="hs-item">
              <BioSlideOne />
            </div>
            <div className="hs-item">
              <BioSlideTwo />
            </div>
            <div className="hs-item">
              <BioSlideThree />
            </div>
          </HorizontalSection>
        </div>
      )}
    </div>
  );
};

export default WhoIAm;
