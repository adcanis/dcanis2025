import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import LeadershipAnimation from "@/assets/lottie/design.json";

const Interlude = () => {
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
    <div className="page-container services-interlude" ref={containerRef}>
      <motion.div style={{ y }} className="content">
        <motion.div
          className="inner-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="left" />
          <div className="right">
            <p>My Belief</p>
            <h2>
              Leadership is clarity. No noise. No ego. No bullsh*t. I believe
              high-performing teams don’t need control — they need direction. My
              job is to remove ambiguity, align strategy with execution, and
              give people the context and confidence to do their best work.
            </h2>
            <h2>
              Clear purpose creates confident teams, predictable outcomes, and
              products that actually move organizations forward.
            </h2>
            <Lottie
              className="animation"
              lottieRef={lottieRef}
              animationData={LeadershipAnimation}
              loop={true}
            />
          </div>
          <motion.h1
            className="slogan"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            No Bullsh*t
          </motion.h1>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Interlude;
