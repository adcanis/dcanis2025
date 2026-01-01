import React from "react";
import { motion } from "framer-motion";
import PixelBG from "../PixelBG";
import * as MdICons from "react-icons/md";

const data = [
  {
    id: 1,
    stat: "17",
    label: "Years of Experience",
  },
  {
    id: 2,
    stat: "100+",
    label: "Projects Completed",
  },
  {
    id: 3,
    stat: "60k",
    label: "Customers Served",
  },
];

const Summary = () => {
  return (
    <div className="page-container summary-container">
      <PixelBG className="summary-pixels" cellSize={20} />
      <motion.div className="content">
        <motion.div
          className="inner-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        >
          <motion.h1 className="section-title">
            <span>
              <MdICons.MdArrowForward />
            </span>
            Summary
          </motion.h1>
          <motion.div
            className="summary-grid"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {data.map((item) => (
              <div key={item.id} className="summary-item">
                <h1 className="stat">{item.stat}</h1>
                <p>{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Summary;
