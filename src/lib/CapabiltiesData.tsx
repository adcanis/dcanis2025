import StratIcon from "@/assets/icon-strat.png";
import StratImg from "@/assets/cap-strat.jpg";
import DevIcon from "@/assets/icon-code.png";
import DevImg from "@/assets/cap-eng.jpg";
import ProdIcon from "@/assets/icon-product.png";
import ProdImg from "@/assets/cap-dp.png";
import DesignIcon from "@/assets/icon-design.png";
import DesignImg from "@/assets/cap-design.png";

export const capabilities = [
  {
    id: 1,
    name: "Strategy",
    description:
      "I help organizations cut through ambiguity and define clear direction. From stakeholder alignment to system planning, I focus on turning complex problems into structured, executable strategies that teams can actually deliver against.",
    icon: StratIcon.src,
    image: StratImg.src,
    subItems: [
      { id: 0, name: "Stakeholder Management" },
      { id: 1, name: "Information Architecture" },
      { id: 2, name: "Infrastructure & Systems Planning" },
      { id: 3, name: "Roadmapping & Delivery Strategy" },
      { id: 4, name: "Digital Transformation Leadership" },
    ],
  },
  {
    id: 2,
    name: "Engineering",
    description:
      "I design and build scalable, resilient systems — from frontend to infrastructure. My focus is on clean architecture, long-term maintainability, and engineering decisions that support real business outcomes, not short-term fixes.",
    icon: DevIcon.src,
    image: DevImg.src,
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
    id: 3,
    name: "Digital Products",
    description:
      "I lead products from idea to execution, bridging strategy, design, and engineering. The goal is simple: build platforms that are intuitive to use, technically sound, and capable of evolving as organizations grow.",
    icon: ProdIcon.src,
    image: ProdImg.src,
    subItems: [
      { id: 0, name: "End-to-End Product Development" },
      { id: 1, name: "Consumer & Enterprise Platforms" },
      { id: 2, name: "Feature Architecture & UX Flows" },
      { id: 3, name: "Product Growth & Optimization" },
      { id: 4, name: "Design-to-Development Execution" },
    ],
  },
  {
    id: 4,
    name: "Design",
    description:
      "I design experiences that evoke emotion, while promoting usability and engagement. From interface systems to motion, every design decision serves a purpose — reducing friction, guiding users, and reinforcing how a product should feel and function.",
    icon: DesignIcon.src,
    image: DesignImg.src,
    subItems: [
      { id: 0, name: "User Experience Design" },
      { id: 1, name: "Interface & Interaction Design" },
      { id: 2, name: "Motion & Micro-Animation" },
      { id: 3, name: "Visual Design & Brand Systems" },
    ],
  },
];
