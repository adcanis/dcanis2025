import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { AllWork } from "./lib/Data";

interface FeatWorkProps {
  selectedFilter: string;
}

const IMG_W = 512;
const IMG_H = 512;

const FeatWork = ({ selectedFilter }: FeatWorkProps) => {
  const router = useRouter();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [activeImg, setActiveImg] = React.useState<string | null>(null);
  const [activeItem, setActiveItem] = React.useState<any>(null);
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX);
  const springY = useSpring(mouseY);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setActiveImg("");
        setIsHovered(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const filtered = React.useMemo(() => {
    if (selectedFilter === "All") return AllWork;
    return AllWork.filter((item) => item.category.includes(selectedFilter));
  }, [selectedFilter]);

  const positionOverRow = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const rowRect = (
      e.currentTarget as HTMLTableRowElement
    ).getBoundingClientRect();

    const x = e.clientX - containerRect.left - IMG_W / 2;
    const y = rowRect.top - containerRect.top + (rowRect.height - IMG_H) / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = (img: any) => {
    if (img) {
      setActiveImg(img.featuredImg);
      setActiveItem(img);
      setIsHovered(true);
    } else {
      setIsHovered(false);
      setActiveImg(null);
      setActiveItem(null);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="feat-work-container"
      data-theme="light"
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
    >
      <table className="feat-work-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Role</th>
            <th>Services</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr
              key={item.id}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={() => handleMouseLeave}
              onMouseMove={positionOverRow}
              onClick={() =>
                item.comingSoon ? null : router.push(`/work/${item.title}`)
              }
            >
              <td>{item.title}</td>
              <td>{item.role}</td>
              <td>{item.category.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <motion.div
        className="hover-img"
        style={{
          x: springX,
          y: springY,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.25 }}
      >
        <Image
          src={activeImg || ""}
          alt="Hover Background"
          width={512}
          height={512}
          draggable={false}
        />
        <motion.div
          className="view-btn"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <p>{activeItem?.comingSoon ? "Coming Soon!" : "View Project"}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeatWork;
