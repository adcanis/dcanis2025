import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "@/utils/LenisLink";
import Sig from "@/assets/sig.png";
import { socialLinks } from "@/lib/socialLinkData";

const Footer = () => {
  return (
    <motion.footer
      className="page-container footer"
      initial={{ y: -100 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
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
        <div className="copyright">
          <p>
            &copy;{new Date().getFullYear()} Andrew Dikianidis. All rights
            reserved.
          </p>
          <Link href="/credits" className="credits-link">
            Credits
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
