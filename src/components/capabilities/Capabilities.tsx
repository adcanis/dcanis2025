"use client";
import React from "react";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { motion } from "framer-motion";
import { CapData } from "./lib/CapData";

type Capability = (typeof CapData)[number];

const CapabilityItem: React.FC<{ capability: Capability }> = ({
  capability,
}) => {
  const lottieRef = React.useRef<LottieRefCurrentProps>(null);

  React.useEffect(() => {
    lottieRef.current?.setSpeed(0.15);
  }, []);

  const ImgBlock = (
    <div className="img">
      <Image
        src={capability.image}
        alt={`Capability ${capability.id + 1}`}
        width={720}
        height={1024}
      />
      <Lottie
        className={
          capability.position === "left"
            ? "cap-animation-left"
            : "cap-animation-right"
        }
        lottieRef={lottieRef}
        animationData={capability.animation}
        loop
        autoplay
        onDOMLoaded={() => lottieRef.current?.setSpeed(0.15)}
      />
    </div>
  );

  const CopyBlock = (
    <div className="copy">
      <h1 className="capability-title">{capability.title}</h1>
      <p className="capability-description">{capability.description}</p>
      <ul className="capability-options">
        {capability.options.map((option) => (
          <li key={option.id} className="capability-option">
            {option.title}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <motion.div
      className="capability-item"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {capability.position === "left" ? (
        <>
          {CopyBlock}
          {ImgBlock}
        </>
      ) : (
        <>
          {ImgBlock}
          {CopyBlock}
        </>
      )}
    </motion.div>
  );
};

const Capabilities = () => {
  return (
    <div className="capabilities-container" data-theme="light">
      <div className="capabilities-content">
        <div className="capabilities-list">
          {CapData.map((cap) => (
            <CapabilityItem key={cap.id} capability={cap} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Capabilities;
