import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Industries as IndustryData } from "@/lib/IndustryData";
import TextSplit from "../text-effects/TextSplit";
import Slider from "../Slider";
import TextMask from "../text-effects/TextMask";
import { GoDotFill } from "react-icons/go";

const Industries = () => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 95%", "end start"],
  });

  const starScale = useTransform(scrollYProgress, [0, 0.3], [-0.25, 1]);

  return (
    <motion.div className="page-container services-industries">
      <Slider text="Industries" tilt={-2} rows={2} icon={<GoDotFill />} />
      <div className="section-container content" ref={scrollRef}>
        <motion.div
          className="industries-list-container"
          style={{ scale: starScale }}
        >
          {IndustryData.map((industry) => (
            <TextSplit
              key={industry.id}
              text={industry.text}
              text2={industry.text2}
              color="#0b090a"
              fontSize="7em"
              imageSrc={industry.image}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Industries;
