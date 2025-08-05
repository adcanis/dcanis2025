"use client";
import React from "react";
import gsap from "gsap";

const PageTransition = () => {
  const rectRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.set(rectRef.current, {
        autoAlpha: 1,
        transformOrigin: "center center",
      })
        .fromTo(
          rectRef.current,
          { scaleX: 0, scaleY: 0 },
          {
            scaleX: 1,
            scaleY: 1,
            duration: 0.5,
            ease: "power2.out",
          }
        )
        .to(rectRef.current, {
          yPercent: -100,
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.1,
        })
        .set(rectRef.current, { transformOrigin: "center top" })
        .to(rectRef.current, {
          scaleY: 0,
          duration: 0.4,
          ease: "power1.in",
        })
        .to(rectRef.current, {
          autoAlpha: 0,
          duration: 0.2,
          ease: "none",
        });
    });

    return () => ctx.revert();
  }, []);

  return <div ref={rectRef} className="page-transition-rect" />;
};

export default PageTransition;
