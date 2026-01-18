"use client";
import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Loader from "@/components/Loader";
import Navbar from "@/components/navbar/Navbar";
import "@/styles/main.scss";

export const AppContext = React.createContext<{
  lenis: Lenis | null;
} | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null);
  const [screenSize, setScreenSize] = React.useState<number>(window.innerWidth);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const raf = React.useCallback(
    (time: number) => {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    },
    [lenis],
  );

  React.useEffect(() => {
    const updateSize = () => {
      setScreenSize(window.innerWidth);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  React.useEffect(() => {
    if (!lenis) {
      setLenis(
        new Lenis({
          lerp: screenSize >= 768 ? 0.015 : 0.1,
          wheelMultiplier: 0.4,
          touchMultiplier: 0.6,
          syncTouch: true,
          smoothWheel: true,
          duration: 3.5,
        }),
      );
    }

    requestAnimationFrame(raf);

    return () => {
      lenis?.destroy();
    };
  }, [lenis, raf, screenSize]);

  return (
    <AppContext.Provider value={{ lenis }}>
      <main className="App">
        <Head>
          <title>Andrew Dikianidis</title>
          <meta
            name="description"
            content="Andrew Dikianidis - Your digital solutions partner"
          />
          <link rel="icon" href="/favicon.jpg" />
        </Head>
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
