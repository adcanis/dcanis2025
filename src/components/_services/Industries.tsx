import React from "react";
import { motion, useInView } from "framer-motion";
import { Industries as IndustryData } from "@/lib/IndustryData";
import FallingCode from "../FallingCode";
import Slider from "../Slider";
import * as TbIcons from "react-icons/tb";

const Industries = () => {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const isNear = useInView(listRef, {
    margin: "-25% 0px -25% 0px",
    amount: 0.05,
  });

  return (
    <div
      className={`page-container services-industries ${
        isNear ? "is-industries-bg" : ""
      }`}
    >
      <Slider
        text="Industries"
        tilt={-5}
        icon={<TbIcons.TbSquareDotFilled />}
        rows={3}
      />
      <div className="section-container content" ref={listRef}>
        <div className="industries-list-container">
          {IndustryData.map((industry, index) => (
            <motion.div
              key={industry.id}
              className="industry-item"
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              <h2>{industry.name}</h2>
            </motion.div>
          ))}
        </div>
        <FallingCode />
      </div>
    </div>
  );
};

export default Industries;
