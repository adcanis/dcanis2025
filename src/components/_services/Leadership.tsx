import React from "react";
import { motion } from "framer-motion";
import { leadershipApproach } from "@/lib/LeadershipData";

const Leadership = () => {
  return (
    <div className="page-container leadership-container">
      <div className="section-container content" data-theme="light">
        <p className="section-title">My Approach</p>
        <div className="approach-list">
          {leadershipApproach.map((approach) => (
            <motion.div
              key={approach.id}
              className="approach-item"
              initial={{
                opacity: 0,
                y: 50,
                borderBottom: "0px solid rgba(0, 0, 0, 0)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
              }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              <h4>{approach.id}</h4>
              <h1>{approach.name}</h1>
              <p>{approach.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;
