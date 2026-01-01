import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Industries as IndustryData } from "@/lib/IndustryData";
import TextMask from "../text-effects/TextMask";
import TextSplit from "../text-effects/TextSplit";

const Industries = () => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 95%", "end start"],
  });

  const starScale = useTransform(scrollYProgress, [0, 0.3], [-0.25, 1]);

  return (
    <motion.div className="page-container services-industries">
      <TextMask
        text="Industries"
        fontSize="20rem"
        background="#f5f7ff"
        scale={35}
        scaleDirection="up"
      />
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
              color="#e3e8eb"
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
