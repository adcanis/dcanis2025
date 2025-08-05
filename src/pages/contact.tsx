import React from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { ScrollDetection } from "@/hooks/useScrollDetection";
import { validateForm } from "@/utils/formValidate";
import Faq from "@/components/faq/Faq";
import Footer from "@/components/Footer";
import about_hero from "@/assets/about_hero.jpg";

const Contact = () => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [budget, setBudget] = React.useState<string>("");
  const [buttonText, setButtonText] = React.useState<string>("Send it!");

  const controls = useAnimation();
  const scrollDirection = ScrollDetection();

  React.useEffect(() => {
    if (!scrollDirection) return;

    controls.start({
      scale: scrollDirection === "down" ? 1.1 : 0.98,
      transition: { duration: 0.35, ease: "easeOut" },
    });
  }, [controls, scrollDirection]);

  const handleSubmit = () => {
    if (!validateForm({ name, email, message, budget, startDate })) {
      return;
    }
    try {
      emailjs.send(
        `${process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID}`,
        {
          from_name: name,
          reply_to: email,
          startDate,
          message,
          budget,
        },
        `${process.env.NEXT_PUBLIC_EMAIL_JS_AUTH_TOKEN}`
      );
      setButtonText("Message sent!");
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error sending email", error);
      toast.error("Something went wrong. Please try again later.");
    }
    setName("");
    setEmail("");
    setStartDate("");
    setMessage("");
    setBudget("");

    setTimeout(() => {
      setButtonText("Send Message");
    }, 3000);
  };

  return (
    <motion.div
      className="contact-container"
      data-theme="light"
      initial={{ opacity: 0, z: 100 }}
      animate={{ opacity: 1, z: 0 }}
      exit={{ opacity: 0, z: -100 }}
      transition={{ duration: 1, delay: 0.75 }}
    >
      <div className="background" data-theme="light" />
      <div className="contact-content">
        <div className="hero">
          <div className="left">
            <h1>
              Let<span>{"'"}</span>s Talk
            </h1>
            <p>
              {`We'd love to learn more about you and what we can design and build together.`}
            </p>
          </div>
          <div className="right">
            <motion.div
              className="hero-transition-container"
              data-theme="light"
              animate={controls}
            >
              <Image
                src={about_hero.src}
                alt="About Hero"
                width={1024}
                height={768}
              />
            </motion.div>
          </div>
        </div>
        <motion.form
          className="contact-form"
          data-theme="light"
          initial={{ opacity: 0, z: 100 }}
          whileInView={{ opacity: 1, z: 0 }}
          exit={{ opacity: 0, z: -100 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Hi, my name is"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="My email is"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            name="message"
            id="message"
            placeholder="I am interested in"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <label htmlFor="budget">
            My budget is around {"("}CAD{")"}
          </label>
          <div className="budget-btns-container">
            <button
              type="button"
              className={
                budget === "20-50k" ? "btn-black" : "btn-transparent-dark"
              }
              onClick={() => setBudget("20-50k")}
            >
              20 - 50k
            </button>
            <button
              type="button"
              className={
                budget === "50-100k" ? "btn-black" : "btn-transparent-dark"
              }
              onClick={() => setBudget("50-100k")}
            >
              50 - 100k
            </button>
            <button
              type="button"
              className={
                budget === "100k+" ? "btn-black" : "btn-transparent-dark"
              }
              onClick={() => setBudget("100k+")}
            >
              100k +
            </button>
          </div>
          <label htmlFor="startDate">I{"'"}d like to start on</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            placeholder="yyyy-mm-dd"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <motion.div
            className="form-submit"
            initial={{
              opacity: 0,
              transform: "scale(1.01)",
            }}
            whileInView={{
              opacity: 1,
              transform: "scale(1.02)",
            }}
            transition={{ duration: 0.25, delay: 0.5 }}
          >
            <button type="button" className="btn-black" onClick={handleSubmit}>
              {buttonText}
            </button>
          </motion.div>
        </motion.form>
      </div>
      <Faq />
      <Footer />
    </motion.div>
  );
};

export default Contact;
