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
        "service_ug2e17r",
        "template_bn578j7",
        {
          name: email.name,
          email: email.email,
          message: email.message,
        },
        "BzBRBBTFpV172J0OG",
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
            <motion.a
              href="https://linkedin.com/in/buzzalvin"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconBox}
              whileHover={{ scale: 1.012, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaLinkedin className={styles.icon} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/buzzalvin"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconBox}
              whileHover={{ scale: 1.012, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaTwitter className={styles.icon} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/buzzalvin"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconBox}
              whileHover={{ scale: 1.012, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaInstagram className={styles.icon} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/buzzalvin"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconBox}
              whileHover={{ scale: 1.012, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaTiktok className={styles.icon} />
            </motion.a>
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
        <motion.a
          href="#about"
          className={styles.links}
          whileHover={{ scale: 1.012, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          About
        </motion.a>
        <motion.a
          href="#experience"
          className={styles.links}
          whileHover={{ scale: 1.012, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Experience
        </motion.a>
        <motion.a
          href="#projects"
          className={styles.links}
          whileHover={{ scale: 1.012, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Projects
        </motion.a>
        <motion.a
          href="#contact"
          className={styles.links}
          whileHover={{ scale: 1.012, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Contact
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
