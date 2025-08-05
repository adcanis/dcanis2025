import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import WaveAnimation from "@/assets/lottie/waves.json";
import { socialLinks } from "@/utils/socialLinkData";

const Footer = () => {
  return (
    <footer className="footer-container">
      <Lottie
        animationData={WaveAnimation}
        loop
        autoplay
        className="footer-wave-animation"
      />
      <div className="footer-content">
        <div className="left">
          <div className="top">
            <h1>
              Let<span>{"'"}</span>s Talk
            </h1>
            <a href="mailto:hey@adcanis.com" className="btn-underline">
              hey@adcanis.com
            </a>
            <a href="tel:+15197183175" className="btn-underline">
              +1 519 718 3175
            </a>
          </div>
          <div className="bottom">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="right">
          <div className="top">
            <Link href="/Work" className="btn-underline">
              Work
            </Link>
            <Link href="/About" className="btn-underline">
              About
            </Link>
            <Link href="/Contact" className="btn-underline">
              Contact
            </Link>
          </div>
          <div className="bottom">
            <p>
              © {new Date().getFullYear()} Andrew Dikianidis. All rights
              reserved.
            </p>
            <Link href="/privacy-policy" className="btn-underline">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="btn-underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
