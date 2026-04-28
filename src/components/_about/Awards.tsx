import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import ScrollText from "../text-effects/ScrollText";
import * as MdICons from "react-icons/md";
import AwardsMatter from "../AwardsMatter";

const Awards = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5vh", "150dvh"]);

  return (
    <div className="page-container about-awards" ref={containerRef}>
      <motion.div style={{ y }} className="content">
        <motion.div
          className="inner-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="top">
            <div className="left">
              <motion.h1>
                <span>
                  <MdICons.MdArrowForward />
                </span>
                Awards & Recognitions
              </motion.h1>
            </div>
            <div className="right">
              <ScrollText
                text="I've had the pleasure of working with amazing clients and teams over the years, some even earning awards along the way."
                fontSize="2em"
                color="#0b090a"
              />
            </div>
          </div>
          <div className="bottom">
            <AwardsMatter />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Awards;
