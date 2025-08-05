"use client";
import React from "react";
import Image from "next/image";
import gsap from "gsap";
import background from "@/assets/scroll-bg.png";
import * as BsIcons from "react-icons/bs";

const ScrollDownBtn = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const arrowRef = React.useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = React.useState(false);

  // Delay show
  React.useEffect(() => {
    const delay = setTimeout(() => {
      setShowButton(true);
    }, 1500);

    return () => clearTimeout(delay);
  }, []);

  // Animate in + infinite loops
  React.useLayoutEffect(() => {
    if (!showButton) return;

    const ctx = gsap.context(() => {
      // Fade + Slide In
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -10, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: 0.35,
          ease: "power2.out",
        }
      );

      // Infinite rotation on image
      gsap.to(imgRef.current, {
        rotate: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      // Floating arrow animation
      gsap.to(arrowRef.current, {
        y: 36,
        opacity: 0.75,
        duration: 2,
        ease: "easeInOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, [showButton]);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight + 100,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton ? (
        <div
          className="scroll-down-container"
          ref={containerRef}
          onClick={handleScroll}
        >
          <Image
            ref={imgRef}
            src={background}
            alt="Scroll Down Background"
            className="scroll-bg"
            width={124}
            height={124}
          />
          <div ref={arrowRef} className="floating-arrow">
            <BsIcons.BsChevronCompactDown />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ScrollDownBtn;
