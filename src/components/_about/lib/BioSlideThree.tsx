import React from "react";
import { motion } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import presentAnimation from "@/assets/lottie/development.json";

const BioSlideThree = () => {
  const lottieRef = React.useRef<LottieRefCurrentProps>(null);

  React.useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.15);
    }
  }, []);

  return (
    <motion.div
      className="bio-info-container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.33,
        ease: "easeOut",
      }}
    >
      <div className="bio-content">
        <div className="left">
          <motion.p
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut
            consectetur ante. Vivamus ultricies molestie imperdiet. Nulla
            facilisi. Sed maximus enim tincidunt, mattis nisl vel, fringilla
            lectus. Vivamus magna turpis, tincidunt sit amet augue ac, aliquam
            pellentesque augue. Cras lorem elit, pulvinar eget pharetra id,
            tincidunt at nibh. Vestibulum facilisis quis nunc id rutrum.
          </motion.p>
        </div>
        <div className="right">
          <Lottie
            lottieRef={lottieRef}
            className="bio-animation"
            animationData={presentAnimation}
            loop={true}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BioSlideThree;
