import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Sig from "@/assets/sig.png";
import { socialLinks } from "@/lib/socialLinkData";

const Footer = () => {
  return (
    <motion.footer className="page-container footer">
      <div className="section-container footer-content">
        <motion.div
          className="top"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Image
            src={Sig.src}
            alt="Andrew Dikianidis Signature"
            width={1024}
            height={512}
          />
        </motion.div>
        <div className="bottom">
          {socialLinks.slice(1).map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              {link.icon}
            </Link>
          ))}
        </div>
        <p>
          &copy;{new Date().getFullYear()} Andrew Dikianidis. All rights
          reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
