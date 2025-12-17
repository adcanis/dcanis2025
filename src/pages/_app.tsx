"use client";
import React from "react";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import Lenis from "lenis";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import "@/styles/main.scss";

export default function App({ Component, pageProps }: AppProps) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.033,
      wheelMultiplier: 0.7,
      touchMultiplier: 0.9,
      syncTouch: true,
      smoothWheel: true,
      duration: 2,
    });
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="App">
      {!isLoading ? (
        <div data-scroll-container ref={scrollRef} className="scroll-container">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="light"
          />
          <Navbar />
          <Component {...pageProps} />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <Loader setIsLoading={setIsLoading} />
        </AnimatePresence>
      )}
    </main>
  );
}
