import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "@/utils/LenisLink";
import ScrollText from "@/components/text-effects/ScrollText";
import { MdArrowOutward } from "react-icons/md";

const Intro = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5vh", "150dvh"]);

  return (
    <div className="page-container home-intro-container" ref={containerRef}>
      <motion.div className="content">
        <motion.div
          className="inner-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ScrollText
            text="For nearly two decades, I’ve been trusted to build and lead the digital foundations behind companies, institutions, and high-impact teams.
From government platforms to mission-critical tools, my work supports how people operate, decide, and scale."
            color="#e3e8eb"
            // fontSize="6em"
          />
          <Link className="btn-basic" href="/about">
            My Story
            <span>
              <MdArrowOutward />
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Intro;
