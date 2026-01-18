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

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const raf = React.useCallback(
    (time: number) => {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    },
    [lenis],
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
        }),
      );
    }

    requestAnimationFrame(raf);

    return () => {
      lenis?.destroy();
    };
  }, [lenis, raf]);

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
