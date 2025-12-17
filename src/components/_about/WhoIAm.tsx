import React from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import TextSlider from "../TextSlider";
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
        <h1 className="about-intro">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          consectetur elementum nulla quis gravida. Suspendisse tempor ut neque
          at sagittis.
        </h1>
        <TextSlider
          tilt={-5}
          rows={1}
          images={[About1.src, About2.src, About3.src, About4.src, About5.src]}
        />
        <div className="about-container">
          <div className="left">
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              consectetur elementum nulla quis gravida. Suspendisse tempor ut
              neque at sagittis. Integer cursus feugiat lectus, non eleifend
              tellus fermentum ut. In nibh ipsum, mollis in euismod in, semper
              vel mi. Aliquam lacinia eget ligula sed porta. Pellentesque et
              libero at velit porta efficitur a sit amet libero. Sed vel justo
              at urna mattis ultricies ut eget ligula. Morbi et sapien euismod
              lacus tincidunt consectetur.
            </motion.p>
          </div>
          <div className="right">
            <p>
              Turns out, when you focus on results, people notice. Now, that’s
              interesting.
            </p>
          </div>
        </div>
        <TextSlider
          tilt={-5}
          images={[
            AwwwardsIcon.src,
            CssIcon.src,
            WwwAcLogo.src,
            OrpetronIcon.src,
            TdkIcon.src,
          ]}
          rows={1}
        />
      </div>
    </div>
  );
};

export default WhoIAm;
