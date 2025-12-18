import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const InteractiveCursor = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth follow
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });

  React.useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="interactive-cursor"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1.2 }}
      transition={{ duration: 0.66, delay: 0.33, ease: "easeOut" }}
    >
      {"<-Move->"}
    </motion.div>
  );
};

export default InteractiveCursor;
