"use client";
import React from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import "@/styles/main.scss";

export const AppContext = React.createContext<{
  lenis: Lenis | null;
} | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const raf = React.useCallback(
    (time: number) => {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    },
    [lenis]
  );

  React.useEffect(() => {
    if (!lenis) {
      setLenis(
        new Lenis({
          lerp: 0.015,
          wheelMultiplier: 0.4,
          touchMultiplier: 0.6,
          syncTouch: true,
          smoothWheel: true,
          duration: 3.5,
        })
      );
    }

    requestAnimationFrame(raf);

    return () => {
      lenis?.destroy();
    };
  }, [lenis, raf]);

  // React.useEffect(() => {
  //   const lenis = new Lenis({
  //     lerp: 0.015,
  //     wheelMultiplier: 0.4,
  //     touchMultiplier: 0.6,
  //     syncTouch: true,
  //     smoothWheel: true,
  //     duration: 3.5,
  //   });
  //   function raf(time: any) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  //   requestAnimationFrame(raf);
  // }, []);

  return (
    <AppContext.Provider value={{ lenis }}>
      <main className="App">
        {!isLoading ? (
          <div data-scroll-container className="scroll-container">
            <Navbar />
            <Component {...pageProps} />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <Loader setIsLoading={setIsLoading} />
          </AnimatePresence>
        )}
      </main>
    </AppContext.Provider>
  );
}
