import React from "react";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import "@/styles/main.scss";

export default function App({ Component, pageProps }: AppProps) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (isLoading) return;

    let scroll: any;
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      scroll = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.5,
          wheelMultiplier: 0.7,
          touchMultiplier: 0.9,
          syncTouch: true,
          duration: 1.1,
        },
      });
    })();

    return () => {
      scroll?.destroy?.();
      scroll = null;
    };
  }, [isLoading]);

  return (
    <main className="App" data-scroll-speed="-.2">
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
