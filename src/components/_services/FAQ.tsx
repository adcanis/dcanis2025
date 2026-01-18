import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { FAQData } from "@/lib/FaqData";
import * as MdICons from "react-icons/md";

const FAQ = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <div className="page-container services-faq" ref={containerRef}>
      <motion.div className="content">
        <motion.div
          className="inner-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="faq-container">
            <motion.h1>
              <span>
                <MdICons.MdArrowForward />
              </span>
              A few common questions
            </motion.h1>
            <div className="faq-list">
              {FAQData.map((item, index) => (
                <div className="faq-item" key={item.id}>
                  <div
                    className="faq-question"
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                  >
                    <h2>{item.question}</h2>
                    <span>
                      {activeIndex === index ? (
                        <MdICons.MdExpandLess />
                      ) : (
                        <MdICons.MdExpandMore />
                      )}
                    </span>
                  </div>
                  {activeIndex === index && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FAQ;
