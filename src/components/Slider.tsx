"use client";
import React from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

interface Props {
  text?: string;
  tilt: number;
  rows: number;
  icon?: React.ReactNode;
  images?: string[];
  greyScale?: boolean;
  invert?: boolean;
}

interface TextSlideProps {
  text?: string;
  direction: "left" | "right";
  progress: any;
  icon?: React.ReactNode;
  images?: string[];
  left?: string;
  greyScale?: boolean;
  invert?: boolean;
}

const Slider = ({
  text,
  tilt,
  rows,
  icon,
  images,
  greyScale,
  invert,
}: Props) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      className="text-slider-container"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="spacer" />
      <div ref={containerRef}>
        {Array.from({ length: rows }).map((_, index) => (
          <TextSlide
            key={index}
            text={text}
            direction={index % 2 === 0 ? "left" : "right"}
            left={index % 2 === 0 ? "-10%" : "-15%"}
            icon={icon!}
            images={images}
            greyScale={greyScale}
            invert={invert}
            progress={scrollYProgress}
          />
        ))}
      </div>
      <div className="spacer" />
    </div>
  );
};

const TextSlide = ({
  text,
  direction,
  progress,
  left,
  icon,
  images,
  greyScale,
  invert,
}: TextSlideProps) => {
  const directionValue = direction === "left" ? -1 : 1;
  const translateX = useTransform(
    progress,
    [0, 1],
    [250 * directionValue, -250 * directionValue]
  );
  return (
    <motion.div
      style={{ x: translateX, left: left }}
      className="text-slide-row"
    >
      <Phrase
        text={text}
        icon={icon}
        images={images}
        greyScale={greyScale}
        invert={invert}
      />
      <Phrase
        text={text}
        icon={icon}
        images={images}
        greyScale={greyScale}
        invert={invert}
      />
      <Phrase
        text={text}
        icon={icon}
        images={images}
        greyScale={greyScale}
        invert={invert}
      />
    </motion.div>
  );
};

const Phrase = ({
  text,
  icon,
  images,
  greyScale,
  invert,
}: {
  text?: string;
  icon?: React.ReactNode;
  images?: string[];
  greyScale?: boolean;
  invert?: boolean;
}) => {
  return (
    <div className="phrase-container">
      {text && icon ? (
        <>
          <p className="text">{text}</p>
          <span className="blob">{icon}</span>
        </>
      ) : (
        images &&
        images.map((src, index) => (
          <div key={index} className="image-wrapper">
            <Image
              src={src}
              alt={`slide-image-${index}`}
              className="slide-image"
              width={256}
              height={256}
              style={{
                filter: `${
                  greyScale ? "grayscale(1)" : invert ? "invert(1)" : "none"
                }`,
              }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Slider;
