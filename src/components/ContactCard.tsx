import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import ContactBg from "@/assets/contact-bg.png";

const flipTexts = ["idea", "project", "success"];

const ContactCard = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5vh", "150dvh"]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flipTexts.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="contact-card-container" ref={containerRef}>
      <motion.div style={{ y }} className="content">
        <Image
          src={ContactBg.src}
          alt="Contact Background"
          width={1920}
          height={1080}
          className="background-image"
        />

        <motion.div
          className="inner-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-line">
            <h1>
              Let<span>{"'"}</span>s discuss your next&nbsp;
              <span className="flip-wrapper">
                {flipTexts.map((text, index) => (
                  <motion.span
                    key={index}
                    className="flipping-text"
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{
                      rotateX: currentIndex === index ? 0 : 90,
                      opacity: currentIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {text}
                  </motion.span>
                ))}
              </span>
            </h1>
          </div>
          <motion.div
            className="contact-cta"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <Link
              href="https://calendly.com/adcanis/30min"
              className="calendly-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get in touch
            </Link>
          </motion.div>
          <div className="secondary-cta-options">
            <Link
              href="mailto:hey@adcanis.com"
              className="btn-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              hey@adcanis.com
            </Link>
            {/* <Link
              href="tel:5197183175"
              className="btn-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              +1 519 718 3175
            </Link> */}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactCard;
