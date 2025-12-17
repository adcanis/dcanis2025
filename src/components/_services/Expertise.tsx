import React from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { capabilities } from "@/lib/CapabiltiesData";

const Expertise = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5vh", "150dvh"]);

  return (
    <div className="page-container services-expertise" ref={containerRef}>
      <motion.div style={{ y }} className="content">
        <motion.div
          className="inner-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="left">
            <motion.h1>My Expertise</motion.h1>
          </div>
          <div className="right">
            {capabilities.map((capability) => (
              <motion.div
                key={capability.id}
                className="cap-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src={capability.icon}
                  alt={`${capability.name} Icon`}
                  width={48}
                  height={48}
                />
                <h2>{capability.name}</h2>
                <ul>
                  {capability.subItems.map((subItem) => (
                    <motion.li
                      key={subItem.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.15,
                        ease: "easeOut",
                      }}
                    >
                      {subItem.name}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Expertise;
