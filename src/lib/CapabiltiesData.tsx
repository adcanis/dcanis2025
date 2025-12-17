import StratIcon from "@/assets/icon-strat.png";
import DevIcon from "@/assets/icon-code.png";
import ProdIcon from "@/assets/icon-product.png";
import DesignIcon from "@/assets/icon-design.png";

export const capabilities = [
  {
    id: 0,
    name: "Strategy",
    icon: StratIcon.src,
    subItems: [
      { id: 0, name: "Stakeholder Management" },
      { id: 1, name: "Information Architecture" },
      { id: 2, name: "Infrastructure & Systems Planning" },
      { id: 3, name: "Roadmapping & Delivery Strategy" },
      { id: 4, name: "Digital Transformation Leadership" },
    ],
  },
  {
    id: 1,
    name: "Engineering",
    icon: DevIcon.src,
    subItems: [
      { id: 0, name: "Technology Consulting" },
      { id: 1, name: "Architecture Design & Modeling" },
      { id: 2, name: "Frontend Engineering" },
      { id: 3, name: "Backend Development" },
      { id: 4, name: "API Integration" },
      { id: 5, name: "Cloud Infrastructure & DevOps" },
      { id: 6, name: "Microservices & Distributed Systems" },
    ],
  },
  {
    id: 2,
    name: "Digital Products",
    icon: ProdIcon.src,
    subItems: [
      { id: 0, name: "End-to-End Product Development" },
      { id: 1, name: "Consumer & Enterprise Platforms" },
      { id: 2, name: "Feature Architecture & UX Flows" },
      { id: 3, name: "Product Growth & Optimization" },
      { id: 4, name: "Design-to-Development Execution" },
    ],
  },
  {
    id: 3,
    name: "Design",
    icon: DesignIcon.src,
    subItems: [
      { id: 0, name: "User Experience Design" },
      { id: 1, name: "Interface & Interaction Design" },
      { id: 2, name: "Motion & Micro-Animation" },
      { id: 3, name: "Visual Design & Brand Systems" },
    ],
  },
];
