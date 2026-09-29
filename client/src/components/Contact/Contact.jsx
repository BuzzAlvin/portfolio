import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";

const Contact = () => {
  const [email, setEmail] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          name: email.name,
          email: email.email,
          message: email.message,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
      )
      .then((res) => {
        console.log("SUCCESS", res);
        alert("Message sent successfully!");
        setEmail({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.log("ERROR", err);
        alert("Failed to send message.");
      });
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const socialIcons = [
    { icon: <FaGithub />, path: "https://github.com/BuzzAlvin" },
    { icon: <FaLinkedin />, path: "https://linkedin.com/in/buzzalvin" },
    { icon: <FaWhatsapp />, path: "https://wa.me/2348125923428" },
    { icon: <FaTiktok />, path: "https://www.tiktok.com/buzzalvin_" },
  ];

  const buttomNavLink = [
    { link: "#about", name: "About" },
    { link: "#experience", name: "Experience" },
    { link: "#projects", name: "Projects" },
    { link: "#contact", name: "Contact" },
  ];

  return (
    <motion.section
      id="contact"
      className={styles.section}
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        className={styles.heading}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
      >
        <p className={styles.text}>Get in Touch</p>
        <h2 className={styles.title}>Contact Me</h2>
        <p className={styles.paragraph}>
          Have a project in mind? I'd love to hear from you.
        </p>
      </motion.div>
      <div className={styles.container}>
        <div className={styles.form}>
          <motion.div className={styles.socialContainer} variants={itemVariant}>
            {socialIcons.map((link, index) => (
              <motion.a
                key={index}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconBox}
                whileHover={{ scale: 1.012, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className={styles.icon}>{link.icon}</span>
              </motion.a>
            ))}
          </motion.div>

          <form className={styles.inputBox} onSubmit={handleSubmit}>
            <motion.input
              name="name"
              placeholder="Name"
              value={email.name}
              className={styles.input}
              onChange={handleChange}
              variants={itemVariant}
            />

            <motion.input
              name="email"
              placeholder="Email"
              className={styles.input}
              value={email.email}
              onChange={handleChange}
              variants={itemVariant}
            />
            <motion.textarea
              name="message"
              placeholder="Message"
              value={email.message}
              className={styles.input}
              onChange={handleChange}
              variants={itemVariant}
            />

            <motion.button
              type="submit"
              className={styles.button}
              variants={itemVariant}
              whileHover={{ scale: 1.01, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>

      <motion.div
        className={styles.bottomLinks}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
      >
        {buttomNavLink.map((btn) => (
          <motion.a
            key={btn.name}
            href={btn.link}
            className={styles.links}
            whileHover={{ scale: 1.012, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {btn.name}
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Contact;
