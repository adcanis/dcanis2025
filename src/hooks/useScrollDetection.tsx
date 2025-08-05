import React from "react";

export const ScrollDetection = () => {
  const [direction, setDirection] = React.useState<"up" | "down" | null>(null);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const dir = scrollY > lastScrollY ? "down" : "up";
      if (dir !== direction) setDirection(dir);
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [direction, lastScrollY]);

  return direction;
};
