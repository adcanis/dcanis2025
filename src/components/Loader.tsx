"use client";
import React from "react";
import gsap from "gsap";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import LoadingAnimation from "@/assets/lottie/loading.json";

type LoadingProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Loader = ({ setIsLoading }: LoadingProps) => {
  const hasExitedRef = React.useRef(false);
  const loaderRef = React.useRef<HTMLDivElement>(null);
  const animWrapRef = React.useRef<HTMLDivElement>(null);
  const lottieRef = React.useRef<LottieRefCurrentProps>(null);

  React.useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(2.5);
    }
  }, []);

  const runExit = React.useCallback(() => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;

    if (!loaderRef.current) {
      setIsLoading(false);
      return;
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(loaderRef.current, { opacity: 0 });
      setIsLoading(false);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setIsLoading(false),
      });

      if (animWrapRef.current) {
        tl.to(animWrapRef.current, {
          opacity: 0,
          duration: 0.3,
        });
      }

      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
      });
    }, loaderRef);

    return () => ctx.revert();
  }, [setIsLoading]);

  React.useEffect(() => {
    const bailout = setTimeout(() => {
      runExit();
    }, 12000);
    return () => clearTimeout(bailout);
  }, [runExit]);

  return (
    <div ref={loaderRef} className="loader">
      <div ref={animWrapRef} className="loader-animation">
        <Lottie
          lottieRef={lottieRef}
          animationData={LoadingAnimation}
          loop={false}
          autoplay
          onComplete={runExit}
        />
      </div>
    </div>
  );
};

export default Loader;
