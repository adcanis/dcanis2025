import React from "react";
import Image from "next/image";
import { AwardsData } from "./lib/AwardsData";

const Awards = () => {
  return (
    <div className="awards-container" data-theme="dark">
      <div className="awards-content">
        <h1 className="awards-title">Awards</h1>
        <div className="awards-list">
          {AwardsData.map((award) => (
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

export default Awards;
