import fdtHover from "@/assets/img-fdt-hover.jpg";
import fdtProj1 from "@/assets/img-fdt-proj-1.jpg";
import fdtProj2 from "@/assets/img-fdt-proj-2.jpg";
import fdtProj3 from "@/assets/img-fdt-proj-3.jpg";
import fdtProj4 from "@/assets/img-fdt-proj-4.jpg";
import fdtProj5 from "@/assets/img-fdt-proj-5.jpg";
import fdtProj6 from "@/assets/img-fdt-proj-6.jpg";
import academyHover from "@/assets/img-pac-hover.jpg";
import pacProj1 from "@/assets/img-pac-proj-1.jpg";
import pacProj2 from "@/assets/img-pac-proj-2.jpg";
import pacProj3 from "@/assets/img-pac-proj-3.jpg";
import sonHoverImg from "@/assets/img-son-proj-1.jpg";
import sonProj2 from "@/assets/img-son-proj-2.jpg";
import sonProj3 from "@/assets/img-son-proj-3.jpg";
import nfaHoverImg from "@/assets/img-nfa-hover.jpg";
import nfaProj1 from "@/assets/img-nfa-proj-1.jpg";
import darbHoverImg from "@/assets/img-darb-hover.jpg";
import darbProj1 from "@/assets/img-darb-proj-1.jpg";
import darbProj2 from "@/assets/img-darb-proj-2.jpg";

import comingSoonBg from "@/assets/coming-soon-bg.png";

export const FeatData = [
  {
    id: 0,
    title: "South of North Paper Co.",
    featuredImg: sonHoverImg.src,
    role: "Lead Project Manager",
    category: ["Development", "Design", "Digital Products"],
    comingSoon: true,
  },
  {
    id: 1,
    title: "Norfolk'n Around",
    featuredImg: nfaHoverImg.src,
    role: "Lead Project Manager",
    category: ["Development", "Design"],
    comingSoon: false,
  },
  {
    id: 2,
    title: "Darbishire",
    featuredImg: darbHoverImg.src,
    role: "Lead Software Developer",
    category: ["Development", "Design"],
    comingSoon: false,
  },
];

export const AllWork = [
  {
    id: 0,
    title: "Coast to Classroom",
    featuredImg: comingSoonBg.src,
    images: [
      {
        id: 0,
        src: "",
        alt: "",
      },
    ],
    role: "Sr. Software Developer",
    category: ["Development"],
    comingSoon: true,
  },
  {
    id: 1,
    title: "Perennia Labs",
    featuredImg: comingSoonBg.src,
    images: [
      {
        id: 0,
        src: "",
        alt: "",
      },
    ],
    role: "Sr. Software Developer",
    category: ["Development", "Digital Products"],
    comingSoon: true,
  },
  {
    id: 2,
    title: "Farm Data Tools",

    featuredImg: fdtHover.src,
    images: [
      {
        id: 0,
        src: fdtProj1.src,
        alt: "Farm Data Tools Project 1",
      },
      {
        id: 1,
        src: fdtProj2.src,
        alt: "Farm Data Tools Project 2",
      },
      {
        id: 2,
        src: fdtProj3.src,
        alt: "Farm Data Tools Project 3",
      },
      {
        id: 3,
        src: fdtProj4.src,
        alt: "Farm Data Tools Project 4",
      },
      {
        id: 4,
        src: fdtProj5.src,
        alt: "Farm Data Tools Project 5",
      },
      {
        id: 5,
        src: fdtProj6.src,
        alt: "Farm Data Tools Project 6",
      },
    ],
    role: "Sr. Software Developer",
    category: ["Development", "Digital Products"],
    url: "https://www.farmdatatools.perennia.ca/",
    comingSoon: false,
  },
  {
    id: 3,
    title: "Perennia Academy",
    featuredImg: academyHover.src,
    images: [
      {
        id: 0,
        src: pacProj1.src,
        alt: "Perennia Academy Project 1",
      },
      {
        id: 1,
        src: pacProj2.src,
        alt: "Perennia Academy Project 2",
      },
      {
        id: 2,
        src: pacProj3.src,
        alt: "Perennia Academy Project 3",
      },
    ],
    role: "Sr. Software Developer",
    category: ["Development", "Digital Products"],
    url: "https://academy.perennia.ca/",
    comingSoon: false,
  },
  {
    id: 4,
    title: "South of North Paper Co.",
    featuredImg: sonHoverImg.src,
    images: [
      {
        id: 0,
        src: sonProj2.src,
        alt: "South of North Paper Co. Project 2",
      },
      {
        id: 1,
        src: sonProj3.src,
        alt: "South of North Paper Co. Project 3",
      },
    ],
    role: "Lead Project Manager",
    category: ["Development", "Design", "Digital Products"],
    url: "https://www.southofnorthpaper.com/",
    comingSoon: false,
  },
  {
    id: 5,
    title: "Norfolk'n Around",
    featuredImg: nfaHoverImg.src,
    images: [
      {
        id: 0,
        src: nfaProj1.src,
        alt: "Norfolk'n Around Project 1",
      },
    ],
    role: "Lead Project Manager",
    category: ["Development", "Design"],
    comingSoon: false,
  },
  {
    id: 6,
    title: "Darbishire",
    featuredImg: darbHoverImg.src,
    images: [
      {
        id: 0,
        src: darbProj1.src,
        alt: "",
      },
      {
        id: 1,
        src: darbProj2.src,
        alt: "",
      },
    ],
    role: "Lead Software Developer",
    category: ["Development", "Design"],
    comingSoon: false,
  },
];
