import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import * as AiIcons from "react-icons/ai";

const Navbar = () => {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);
  const [onDarkBackground, setOnDarkBackground] = React.useState(false);

  const container = {
    open: {
      opacity: 1,
      pointerEvents: "auto" as const,
      transition: { when: "beforeChildren" },
    },
    closed: {
      opacity: 0,
      pointerEvents: "none" as const,
      transition: { when: "afterChildren" },
    },
  };

  React.useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
            );

          if (visibleEntries.length > 0) {
            const theme = visibleEntries[0].target.getAttribute("data-theme");
            console.log("data-theme", theme);
            setOnDarkBackground(theme === "dark");
          }
        },
        {
          threshold: 0.5,
          rootMargin: "-64px 0px 0px 0px",
        }
      );

      document
        .querySelectorAll("[data-theme]")
        .forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <nav
      className={`navbar-container ${isScrolled ? "scrolled" : ""} ${
        onDarkBackground ? "on-dark" : ""
      }`}
    >
      <div className="left">
        <Link href="/" className="logo">
          Dcan<span>i</span>s
        </Link>
      </div>
      <div className="right">
        <button
          className={
            showMenu
              ? "btn-basic mobile-menu-btn open"
              : "btn-basic mobile-menu-btn"
          }
          type="button"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
            <motion.span
              initial={{
                opacity: 0.75,
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              }}
              whileInView={{
                opacity: 1,
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <AiIcons.AiOutlineClose />
            </motion.span>
          ) : (
            <span>
              <AiIcons.AiOutlineMenu />
            </span>
          )}
        </button>
        {showMenu ? (
          <motion.div
            className={showMenu ? "mobile-menu open" : "mobile-menu"}
            variants={container}
            initial={false}
            animate={showMenu ? "open" : "closed"}
          >
            <motion.a
              href="/work"
              className="btn-basic"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.33 }}
            >
              Work
            </motion.a>
            <motion.a
              href="/about"
              className="btn-basic"
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.33 }}
            >
              About
            </motion.a>
            <motion.a
              href="/contact"
              className="btn-basic"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.33 }}
            >
              Contact
            </motion.a>
          </motion.div>
        ) : (
          <>
            <Link href="/work" className="btn-underline desktop-nav-item">
              Work
            </Link>
            <Link href="/about" className="btn-underline desktop-nav-item">
              About
            </Link>
            <Link href="/contact" className="btn-underline desktop-nav-item">
              Contact
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
