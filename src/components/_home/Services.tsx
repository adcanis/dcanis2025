import React from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { capabilities } from "@/lib/CapabiltiesData";
import TextMask from "../text-effects/TextMask";
import Link from "@/utils/LenisLink";
import * as MdIcons from "react-icons/md";

const Services = () => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [screenSize, setScreenSize] = React.useState<number>(window.innerWidth);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 95%", "end start"],
  });

  const starScale = useTransform(scrollYProgress, [0, 0.3], [-0.25, 1]);

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

  return (
    <div className="page-container home-services">
      {screenSize <= 768 ? (
        <div className="mobile-services-intro-wrapper">
          <motion.h1>
            <span>
              <MdIcons.MdArrowForward />
            </span>
            My Expertise
          </motion.h1>
        </div>
      ) : (
        <TextMask
          text="Expertise"
          fontSize={
            screenSize >= 1920
              ? "20rem"
              : screenSize >= 1280
                ? "15rem"
                : screenSize >= 768
                  ? "18rem"
                  : "4rem"
          }
          background="#0b090a"
          color="#f5f7ff"
          scale={
            screenSize >= 1920
              ? 50
              : screenSize >= 1280
                ? 40
                : screenSize >= 768
                  ? 45
                  : 75
          }
          scaleDirection="up"
        />
      )}
      <div className="section-container content" ref={scrollRef}>
        <motion.div
          className="inner-container"
          style={{ scale: screenSize < 768 ? 1 : starScale }}
        >
          {capabilities.map((capability, index) => (
            <motion.div
              className={
                capability.id % 2 === 0
                  ? "capability-card even"
                  : "capability-card odd"
              }
              key={capability.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="cap-item-content">
                <h1>{capability.name}</h1>
                <p>{capability.description}</p>
                <ul>
                  {capability.subItems.map((subItem) => (
                    <li key={subItem.id}>{subItem.name}</li>
                  ))}
                </ul>
              </div>
              <div className="cap-item-image">
                <Image
                  src={capability.image}
                  alt={capability.name}
                  width={720}
                  height={1080}
                />
              </div>
            </motion.div>
          ))}
          <Link className="btn-basic" href="/services">
            See it all
            <span>
              <MdIcons.MdArrowOutward />
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
