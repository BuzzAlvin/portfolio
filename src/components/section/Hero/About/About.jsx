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
          <img src="./images/IMAGE-3.png" alt="#" className={styles.aboutImg} variants={itemVariant}/>
        </motion.div>
        <div className={styles.aboutBoxContainer}>
          <div className={styles.aboutBoxCover}>
            <motion.div className={styles.aboutBox} variants={itemVariant}>
              <FaBriefcase className={styles.icon} />
              <h4 className={styles.aboutBoxTitle}>Experience</h4>
              <p className={styles.text}>2+ years</p>
              <p className={styles.text}>Frontend development</p>
            </motion.div>
            <motion.div className={styles.aboutBox} variants={itemVariant}>
              <FaGraduationCap className={styles.icon} />
              <h4 className={styles.aboutBoxTitle}>Education</h4>
              <p className={styles.text}>B.sc. Physics with Electronics</p>
            </motion.div>
          </div>
          <div className={styles.aboutText}>
            <motion.p className={styles.text} variants={itemVariant}>
              I am a Frontend Developer based in Nigeria with a background in
              Physics with Electronics from Adekunle ajasin University. I
              specialixe in building responsive and modern web applications
              using React, vite, and Tailwind CSS.
            </motion.p>
            <motion.p  className={styles.text} variants={itemVariant}>
              I enjoy creating clean user interfaces, solving real-world
              problems, and continuously improving my skills through practical
              projects.
            </motion.p>
            <motion.p  className={styles.text} variants={itemVariant}>
              I am currently seeking an entry-level frontend developer role to
              grow and contribute to impactful products.{" "}
            </motion.p>
          </div>
         </div>
      </div>
    </motion.section>
  );
};

export default About;
