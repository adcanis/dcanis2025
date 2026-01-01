"use client";
import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface HorizontalSectionProps {
  children: React.ReactNode[];
}

gsap.registerPlugin(ScrollTrigger);

const HorizontalSection = ({ children }: HorizontalSectionProps) => {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current || !gridRef.current) return;

      // Force a layout calculation
      gridRef.current.getBoundingClientRect();

      const totalWidth = gridRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      // Set wrapper height to match scroll distance
      gsap.set(wrapperRef.current, {
        height: scrollDistance,
      });

      gsap.to(gridRef.current, {
        x: () => `-${scrollDistance}px`,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `bottom bottom`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    },
    {
      scope: wrapperRef,
      dependencies: [children.length],
    }
  );

  return (
    <div ref={wrapperRef} className="hs-wrapper">
      <div className="hs-content">
        <div className="hs-content-grid" ref={gridRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default HorizontalSection;
