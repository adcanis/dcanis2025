import Cap1Img from "@/assets/cap-1.jpg";
import Cap2Img from "@/assets/cap-2.jpg";
import Cap3Img from "@/assets/cap-3.jpg";
import leadershipAnimation from "@/assets/lottie/leadership.json";
import designAnimation from "@/assets/lottie/design.json";
import developmentAnimation from "@/assets/lottie/development.json";

export const CapData = [
  {
    id: 0,
    title: "Leadership",
    description: "Guiding teams and projects to success.",
    image: Cap1Img.src,
    animation: leadershipAnimation,
    position: "right",
    options: [
      {
        id: 0,
        title: "Technology Consulting",
      },
      {
        id: 1,
        title: "Architecture Planning",
      },
      {
        id: 2,
        title: "Consumer & Enterprise Software",
      },
      {
        id: 3,
        title: "Cloud Solutions",
      },
      {
        id: 4,
        title: "DevOps Services",
      },
    ],
  },
  {
    id: 1,
    title: "Design",
    description: "Creating user-centric designs that inspire.",
    image: Cap2Img.src,
    animation: designAnimation,
    position: "left",
    options: [
      {
        id: 0,
        title: "Content Strategy",
      },
      {
        id: 1,
        title: "Web Design",
      },
      {
        id: 2,
        title: "Interactive Experiences",
      },
      {
        id: 3,
        title: "Frontend & Backend Development",
      },
      {
        id: 4,
        title: "CMS & E-commerce Solutions",
      },
    ],
  },
  {
    id: 2,
    title: "Development",
    description: "Building robust and scalable digital solutions.",
    image: Cap3Img.src,
    animation: developmentAnimation,
    position: "right",
    options: [
      {
        id: 0,
        title: "Frontend Web Development",
      },
      {
        id: 1,
        title: "Backend Development & API Integration",
      },
      {
        id: 2,
        title: "Mobile App Development",
      },
      {
        id: 3,
        title: "Microservices & Serverless Architecture",
      },
      {
        id: 4,
        title: "Quality Assurance & Testing",
      },
    ],
  },
];
