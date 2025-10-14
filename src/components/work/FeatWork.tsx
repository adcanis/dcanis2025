import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { AllWork } from "./lib/Data";

interface FeatWorkProps {
  selectedFilter: string;
}

const IMG_W = 512;
const IMG_H = 512;
const MAX_OFFSET = 25;

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const FeatWork = ({ selectedFilter }: FeatWorkProps) => {
  const router = useRouter();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [activeImg, setActiveImg] = React.useState<string | null>(null);
  const [activeItem, setActiveItem] = React.useState<any>(null);
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 350, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 30 });

  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);
  const innerSpringX = useSpring(innerX, { stiffness: 400, damping: 32 });
  const innerSpringY = useSpring(innerY, { stiffness: 400, damping: 32 });

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
  }, []);

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

    const hoverImgCenterX = containerRect.left + mouseX.get() + IMG_W / 2;
    const hoverImgCenterY = containerRect.top + mouseY.get() + IMG_H / 2;

    const dx = e.clientX - hoverImgCenterX;
    const dy = e.clientY - hoverImgCenterY;

    const dist = Math.hypot(dx, dy);
    if (dist <= MAX_OFFSET || dist === 0) {
      innerX.set(dx);
      innerY.set(dy);
    } else {
      const scale = MAX_OFFSET / dist;
      innerX.set(dx * scale);
      innerY.set(dy * scale);
    }
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
    innerX.set(0);
    innerY.set(0);
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
              onMouseLeave={handleMouseLeave}
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
        style={{ x: springX, y: springY, pointerEvents: "none" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: isHovered && !!activeImg ? 1 : 0,
          scale: isHovered && !!activeImg ? 1 : 0.98,
        }}
        transition={{ duration: 0.25 }}
        aria-hidden={!isHovered}
      >
        {!!activeImg && (
          <Image
            src={activeImg}
            alt=""
            width={IMG_W}
            height={IMG_H}
            draggable={false}
            priority
          />
        )}
        <motion.div
          className="view-btn"
          style={{
            x: innerSpringX,
            y: innerSpringY,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.98,
          }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <p>{activeItem?.comingSoon ? "Coming Soon" : "View Project"}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeatWork;
