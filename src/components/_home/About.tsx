import React from "react";
import HorizontalSection from "../HorizontalSection";
import IntroSlideOne from "./lib/IntroSlideOne";
import IntroSlideTwo from "./lib/IntroSlideTwo";
import IntroSlideThree from "./lib/IntroSlideThree";
import Slider from "../Slider";
import { GoDotFill } from "react-icons/go";

const About = () => {
  const [screenSize, setScreenSize] = React.useState<number>(window.innerWidth);

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
    <div className="page-container home-about-container">
      {screenSize <= 768 ? (
        <div className="mobile-about-wrapper">
          <IntroSlideOne />
          <div className="about-slider">
            <Slider
              text="ZERO COMPROMISE"
              rows={3}
              tilt={-10}
              icon={<GoDotFill />}
            />
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default About;
