import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Slider from "../Slider";
import ScrollText from "../ScrollText";
import About1 from "@/assets/img-about.jpg";
import About2 from "@/assets/img-about2.jpg";
import About3 from "@/assets/img-about3.jpg";
import About4 from "@/assets/img-about4.jpg";
import About5 from "@/assets/img-about5.jpg";
import AwwwardsIcon from "@/assets/awwwards_logo.png";
import CssIcon from "@/assets/css_logo.png";
import OrpetronIcon from "@/assets/orpetron_logo.png";
import TdkIcon from "@/assets/tdk_logo.png";
import WwwAcLogo from "@/assets/wwwac_logo.png";

const WhoIAm = () => {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const [showIntroClip, setShowIntroClip] = React.useState<boolean>(false);

  const isNear = useInView(listRef, {
    margin: "-25% 0px -25% 0px",
    amount: 0.05,
  });

  return (
    <div
      className={`page-container who-i-am-container ${
        isNear ? "is-near-bg" : ""
      }`}
    >
      <div className="section-container content" ref={listRef}>
        <motion.div
          className="about-intro"
          initial={{
            opacity: 0,
            clipPath: "inset(0% 0% 100% 0%)",
            y: 150,
          }}
          whileInView={{
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
          }}
          transition={{
            duration: 0.88,
            delay: 0.88,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
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
        </motion.div>
        <Slider
          tilt={0}
          rows={1}
          images={[About1.src, About2.src, About3.src, About4.src, About5.src]}
          greyScale={true}
        />
        <div className="about-container">
          <div className="left">
            <ScrollText
              text="  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              consectetur elementum nulla quis gravida. Suspendisse tempor ut
              neque at sagittis. Integer cursus feugiat lectus, non eleifend
              tellus fermentum ut. In nibh ipsum, mollis in euismod in, semper
              vel mi. Aliquam lacinia eget ligula sed porta. Pellentesque et
              libero at velit porta efficitur a sit amet libero. Sed vel justo
              at urna mattis ultricies ut eget ligula. Morbi et sapien euismod
              lacus tincidunt consectetur.  "
            />
          </div>
          <div className="right">
            <p>
              Turns out, when you focus on results, people notice. Now, that’s
              interesting.
            </p>
          </div>
        </div>
        <Slider
          tilt={0}
          images={[
            AwwwardsIcon.src,
            CssIcon.src,
            WwwAcLogo.src,
            OrpetronIcon.src,
            TdkIcon.src,
          ]}
          rows={1}
          invert={true}
        />
      </div>
    </div>
  );
};

export default WhoIAm;
