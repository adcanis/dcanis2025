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
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
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
