import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextMask from "../text-effects/TextMask";
import HorizontalSection from "../HorizontalSection";
import BioSlideOne from "./lib/BioSlideOne";
import BioSlideTwo from "./lib/BioSlideTwo";
import BioSlideThree from "./lib/BioSlideThree";

const WhoIAm = () => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [showIntroClip, setShowIntroClip] = React.useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 95%", "end start"],
  });

  const starScale = useTransform(scrollYProgress, [0, 0.3], [-0.25, 1]);

  return (
    <div className="page-container who-i-am-container">
      <TextMask
        text="Who I Am"
        fontSize="20rem"
        background="#f5f7ff"
        scale={37}
        scaleDirection="up"
      />
      <div className="section-container content" ref={scrollRef}>
        <motion.div className="about-intro" style={{ scale: starScale }}>
          <div className="about-intro-text">
            <span id="quote">{'"'}</span>I{"'"}m a builder first - of systems,
            teams and ideas that actually work. With
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
            focus on clarity, execution and outcomes.
            <span id="quote">{'"'}</span>
          </div>
        </motion.div>
      </div>
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
    </div>
  );
};

export default WhoIAm;
