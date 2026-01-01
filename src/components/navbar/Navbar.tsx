import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./Menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const pathname = usePathname();

  React.useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <motion.nav
      className="navbar-container"
      initial={{ opacity: 0, y: -96 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
    >
      <div className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        <div className={`burger ${isOpen ? "open" : ""}`}>
          <span />
        </div>
      </div>
      <AnimatePresence mode="wait">{isOpen && <Menu />}</AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
