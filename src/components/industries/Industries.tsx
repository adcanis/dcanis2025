import React from "react";
import Image from "next/image";
import { IndustriesData } from "./lib/IndustriesData";

const Industries = () => {
  return (
    <div className="industries" data-theme="dark">
      <div className="awards-content">
        <h1 className="awards-title">Industries</h1>
        <p></p>
        <div className="awards-list">
          {IndustriesData.map((award) => (
            <div className="award-item" key={award.id}>
              <Image
                src={award.icon}
                alt={award.title}
                width={256}
                height={256}
              />
              {award.award === "" ? <p>{award.title}</p> : <p>{award.award}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Industries;
