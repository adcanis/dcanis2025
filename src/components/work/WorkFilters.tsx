import React from "react";
import { FeatData } from "./lib/Data";

interface WorkFiltersProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const WorkFilters = ({
  selectedFilter,
  setSelectedFilter,
}: WorkFiltersProps) => {
  const [counts] = React.useState({
    All: FeatData.length,
    "Digital Products": FeatData.filter((item) =>
      item.category.includes("Digital Products")
    ).length,
    Design: FeatData.filter((item) => item.category.includes("Design")).length,
    Development: FeatData.filter((item) =>
      item.category.includes("Development")
    ).length,
  });
  return (
    <div className="filters">
      <button
        className={
          selectedFilter === "All" ? "btn-underline dark" : "btn-underline"
        }
        type="button"
        onClick={() => setSelectedFilter("All")}
      >
        {selectedFilter === "All" && <span className="active-dot" />}
        All Work
      </button>
      <button
        className={
          selectedFilter === "Digital Products"
            ? "btn-underline dark"
            : "btn-underline"
        }
        type="button"
        onClick={() => setSelectedFilter("Digital Products")}
      >
        {selectedFilter === "Digital Products" && (
          <span className="active-dot" />
        )}
        Digital Products
        <span className="count">{counts["Digital Products"]}</span>
      </button>
      <button
        className={
          selectedFilter === "Design" ? "btn-underline dark" : "btn-underline"
        }
        type="button"
        onClick={() => setSelectedFilter("Design")}
      >
        {selectedFilter === "Design" && <span className="active-dot" />}
        Design
        <span className="count">{counts.Design}</span>
      </button>
      <button
        className={
          selectedFilter === "Development"
            ? "btn-underline dark"
            : "btn-underline"
        }
        type="button"
        onClick={() => setSelectedFilter("Development")}
      >
        {selectedFilter === "Development" && <span className="active-dot" />}
        Development
        <span className="count">{counts.Development}</span>
      </button>
    </div>
  );
};

export default WorkFilters;
