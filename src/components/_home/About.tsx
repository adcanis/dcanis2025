import React from "react";
import HorizontalSection from "../HorizontalSection";
import IntroSlideOne from "./lib/IntroSlideOne";
import IntroSlideTwo from "./lib/IntroSlideTwo";
import IntroSlideThree from "./lib/IntroSlideThree";

const About = () => {
  return (
    <div className="page-container home-about-container">
      <div className="horizontal-section-wrapper">
        <HorizontalSection>
          <div className="hs-item">
            <IntroSlideOne />
          </div>
          <div className="hs-item">
            <IntroSlideTwo />
          </div>
          <div className="hs-item">
            <IntroSlideThree />
          </div>
        </HorizontalSection>
      </div>
    </div>
  );
};

export default About;
