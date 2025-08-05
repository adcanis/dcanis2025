"use client";
import React from "react";
import gsap from "gsap";

type LoadingProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const percents = ["", "10", "25", "33", "50", "66", "90", "100"];

const Loader = ({ setIsLoading }: LoadingProps) => {
  const [percent, setPercent] = React.useState("");
  const [showHello, setShowHello] = React.useState(false);

  const loaderRef = React.useRef<HTMLDivElement>(null);
  const animRef = React.useRef<HTMLDivElement>(null);
  const helloRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    percents.forEach((p, i) => {
      setTimeout(() => setPercent(p), i * 200);
    });

    const showHelloDelay = percents.length * 200 + 250;
    const finishDelay = showHelloDelay + 1200;

    const helloTimer = setTimeout(() => {
      setShowHello(true);
    }, showHelloDelay);

    const exitTimer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsLoading(false),
      });

      tl.to(loaderRef.current, {
        borderBottomLeftRadius: "50% 50%",
        borderBottomRightRadius: "50% 50%",
        duration: 0.5,
        ease: "power2.inOut",
      }).to(
        loaderRef.current,
        {
          yPercent: -100,
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "-=0.3"
      );
    }, finishDelay);

    return () => {
      clearTimeout(helloTimer);
      clearTimeout(exitTimer);
    };
  }, [setIsLoading]);

  React.useLayoutEffect(() => {
    if (animRef.current) {
      gsap.fromTo(
        animRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.15, ease: "power3.out" }
      );
    }
  }, []);

  React.useLayoutEffect(() => {
    if (showHello && helloRef.current) {
      gsap.fromTo(
        helloRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [showHello]);

  return (
    <div ref={loaderRef} className="loader">
      <div ref={animRef} className="loader-animation">
        {!showHello ? (
          <h1>{percent}</h1>
        ) : (
          <div ref={helloRef} className="loader-finished">
            <h1>
              hello<span>.</span>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;
