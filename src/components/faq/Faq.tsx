"use client";
import React from "react";
import { motion } from "framer-motion";
import { faqData } from "./lib/FaqData";
import * as FaIcons from "react-icons/fa";

const Faq = () => {
  const [openId, setOpenId] = React.useState<number | null>(null);

  const toggleAnswer = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="faq-container" data-theme="dark">
      <div className="faq-content">
        <motion.h1
          className="faq-title"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          FAQ
        </motion.h1>
        {faqData.map((faq) => (
          <motion.div
            key={faq.id}
            className="faq-item"
            initial={{
              opacity: 0.75,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            }}
            whileInView={{
              opacity: 1,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="faq-question" onClick={() => toggleAnswer(faq.id)}>
              {faq.question}
              <span>
                {openId === faq.id ? (
                  <FaIcons.FaChevronUp />
                ) : (
                  <FaIcons.FaChevronDown />
                )}
              </span>
            </h3>
            <div
              className={`faq-answer-container ${
                openId === faq.id ? "open" : "closed"
              }`}
            >
              <p className="faq-answer">{faq.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
