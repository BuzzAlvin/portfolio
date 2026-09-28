import { motion } from "framer-motion";
import styles from "../About/About.module.css";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

const About = () => {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  //Years of Experience dynamic
  const yearOfExp = new Date().getFullYear() - 2024;
  return (
    <motion.section
      id="about"
      className={styles.section}
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        className={styles.heading}
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <p className={styles.text}>Get To Know More</p>
        <h2 className={styles.title}>About Me</h2>
      </motion.div>
      <div className={styles.container}>
        <motion.div>
          <img
            src="./images/IMAGE-3.png"
            alt="#"
            className={styles.aboutImg}
            variants={itemVariant}
          />
        </motion.div>
        <div className={styles.aboutBoxContainer}>
          <div className={styles.aboutBoxCover}>
            <motion.div className={styles.aboutBox} variants={itemVariant}>
              <FaBriefcase className={styles.icon} />

              <h4 className={styles.aboutBoxTitle}>Development</h4>

              <p className={styles.text}>{`${yearOfExp}+ years`}</p>

              <p className={styles.text}>Hands-on Projects</p>
            </motion.div>

            <motion.div className={styles.aboutBox} variants={itemVariant}>
              <FaGraduationCap className={styles.icon} />

              <h4 className={styles.aboutBoxTitle}>Education</h4>

              <p className={styles.text}>B.Sc. Physics with Electronics</p>
            </motion.div>
          </div>

          <div className={styles.aboutText}>
            <motion.p className={styles.text} variants={itemVariant}>
              I’m a frontend developer who enjoys turning ideas into websites
              and applications that feel simple, responsive, and easy to use.
              Most of what I’ve learned has come from actually building things,
              breaking them, figuring out why they broke, and improving them.
            </motion.p>

            <motion.p className={styles.text} variants={itemVariant}>
              My background is in Physics with Electronics, which probably
              explains why I enjoy understanding how things work and solving
              problems step by step. Over time, that curiosity led me into web
              development, where I found myself really enjoying the creative
              side of building interfaces as well as the logic behind them.
            </motion.p>

            <motion.p className={styles.text} variants={itemVariant}>
              I’ve worked on different projects, including web apps, e-commerce
              platforms, and full-stack applications with APIs, authentication,
              and databases. I’m always learning something new, experimenting
              with better ways to build things, and becoming a better developer
              with each project.
            </motion.p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
