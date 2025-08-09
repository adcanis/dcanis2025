import React from "react";
import { CapData } from "./lib/CapData";

const Capabilities = () => {
  return (
    <div className="capabilities-container" data-theme="dark">
      <div className="capabilities-content">
        <h1 className="capabilities-title">Capabilities</h1>
        <div className="capabilities-list">
          {CapData.map((capability) => (
            <div key={capability.id} className="capability-item">
              <h2 className="capability-title">{capability.title}</h2>
              <ul className="capability-options">
                {capability.options.map((option) => (
                  <li key={option.id} className="capability-option">
                    {option.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Capabilities;
