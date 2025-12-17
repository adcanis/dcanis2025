import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { socialLinks } from "@/lib/socialLinkData";
import * as AiIcons from "react-icons/ai";
import * as LuIcons from "react-icons/lu";

interface ContactCardProps {
  showContactCard: boolean;
  setShowContactCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const cardVariants = {
  closed: {
    scaleX: 0,
    opacity: 0,
    originX: 0,
    pointerEvents: "none" as const,
  },
  open: {
    scaleX: 1,
    opacity: 1,
    originX: 0,
    pointerEvents: "auto" as const,
  },
};

const ContactCard = ({
  showContactCard,
  setShowContactCard,
}: ContactCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const buttonX = useSpring(mouseX, springConfig);
  const buttonY = useSpring(mouseY, springConfig);

  const handleButtonAreaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const constrainedX = Math.max(
      -36,
      Math.min(36, (x / rect.width) * 72 - 36)
    );

    const yMovement = (y / rect.height) * rect.height - rect.height / 2;

    mouseX.set(constrainedX);
    mouseY.set(yMovement);
  };

  const handleButtonAreaMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  React.useEffect(() => {
    document.body.style.overflow = showContactCard ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showContactCard]);

  return (
    <motion.div
      className="contact-card-container"
      variants={cardVariants}
      initial="closed"
      animate={showContactCard ? "open" : "closed"}
      exit="closed"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div
        className="close-btn-container"
        onMouseMove={handleButtonAreaMouseMove}
        onMouseLeave={handleButtonAreaMouseLeave}
      >
        <motion.button
          className="close-contact-card-btn"
          type="button"
          onClick={() => setShowContactCard(false)}
          whileTap={{ scale: 0.9 }}
          style={{
            x: buttonX,
            y: buttonY,
          }}
        >
          <AiIcons.AiOutlineClose />
        </motion.button>
      </div>
      <motion.div
        className="contact-card-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="social-links-container">
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
        </div>
        <div className="top">
          <motion.h1
            initial={{
              clipPath: "inset(100% 0% 0% 0%)",
              opacity: 0,
              y: 30,
            }}
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.7,
            }}
          >
            Don<span>{"'"}</span>t
            <br />
            be shy
          </motion.h1>
          <p>
            I{"'"}d love to learn more about you and what we can build together.
          </p>
        </div>
        <div className="bottom">
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactCard;
