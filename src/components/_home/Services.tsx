import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import LeadershipAnimation from "@/assets/lottie/design.json";
import * as MdICons from "react-icons/md";

const Services = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const lottieRef = React.useRef<LottieRefCurrentProps>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5vh", "150dvh"]);

  React.useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.15);
    }
  }, []);

  return (
    <div className="page-container home-services" ref={containerRef}>
      <motion.div style={{ y }} className="content">
        <motion.div
          className="inner-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default Services;
