import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ContactCard from "./ContactCard";
import * as AiIcons from "react-icons/ai";

const Navbar = () => {
  const [showContactCard, setShowContactCard] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (showContactCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showContactCard]);

  return (
    <>
      <motion.nav
        className="navbar-container"
        initial={{ opacity: 0, x: -72 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
      >
        <Link href="/" className="logo">
          {`[`}
          <span id="color-change">D</span>
          {`]`}
        </Link>

        <div className="main-links">
          <Link href="/about" className="desktop-nav-item">
            <span className="nav-label">i. about</span>
          </Link>
          <Link href="/services" className="desktop-nav-item">
            <span className="nav-label">ii. services</span>
          </Link>
        </div>

        <button
          type="button"
          className={!showContactCard ? "contact-btn" : "contact-btn active"}
          onClick={() => setShowContactCard(!showContactCard)}
        >
          <span className="contact-label">
            {!showContactCard ? "Let's talk" : "I'm good"}
            <AiIcons.AiOutlineArrowRight />
          </span>
        </button>
      </motion.nav>
      <AnimatePresence>
        {showContactCard && (
          <ContactCard
            showContactCard={showContactCard}
            setShowContactCard={setShowContactCard}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
