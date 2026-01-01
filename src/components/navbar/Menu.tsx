import React from "react";
import Link from "@/utils/LenisLink";
import { motion } from "framer-motion";
import { socialLinks } from "@/lib/socialLinkData";
import { NavData } from "@/lib/NavData";
import { menuSlide } from "./lib/animations";
import Curve from "./Curve";

const Menu = () => {
  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fly-out"
    >
      <div className="menu-content">
        <motion.div
          className="top"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.33,
            ease: "easeOut",
          }}
        >
          <div className="social-links">
            {socialLinks.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span>{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
        <div className="menu-links">
          <motion.div
            className="main-links"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.33,
              ease: "easeOut",
            }}
          >
            {NavData.map((item) => (
              <Link key={item.id} href={item.href} className="desktop-nav-item">
                {item.label}
                <span className="underline" />
              </Link>
            ))}
          </motion.div>
        </div>
        <motion.div
          className="bottom"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.33,
            ease: "easeOut",
          }}
        >
          <Link
            href="https://calendly.com/adcanis/30min"
            className="calendly-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>- Book a Call</span>
            Calendly.com
          </Link>
          <Link href="mailto:hey@adcanis.com" className="email-link">
            <span>- Say Hello</span>
            hey@adcanis.com
          </Link>
        </motion.div>
        {/* <FallingCode /> */}
      </div>
      <Curve />
    </motion.div>
  );
};

export default Menu;
