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
    <motion.div
      className="faq-container"
      data-theme="dark"
      initial={{ opacity: 0, z: 100 }}
      whileInView={{ opacity: 1, z: 0 }}
      exit={{ opacity: 0, z: -100 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <div className="faq-content">
        <h1 className="faq-title">FAQ</h1>
        {faqData.map((faq) => (
          <div key={faq.id} className="faq-item">
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
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Faq;
