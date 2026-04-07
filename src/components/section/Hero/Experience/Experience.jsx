import { motion } from "framer-motion";
import {
  FaReact,
  FaJs,
  FaNodeJs,
  FaHtml5,
  FaCss3,
  FaGitSquare,
} from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import styles from "../Experience/Experience.module.css";

const Experience = () => {
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
      id="experience"
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
        <p className={styles.text}>Explore my</p>
        <h2 className={styles.title}>My Tech Stack</h2>
      </motion.div>
      <div className={styles.container}>
        <div className={styles.techStack}>
          <motion.div className={styles.techItem} variants={itemVariant} whileHover={{scale: 1.1, y: -5}} transition={{type: "spring", stiffness: 300}}>
            <FaHtml5 className={styles.icon} />
            <p className={styles.techText}>HTML5</p>
          </motion.div>

          <motion.div className={styles.techItem} variants={itemVariant} whileHover={{scale: 1.1, y: -5}} transition={{type: "spring", stiffness: 300}}>
            <FaCss3 className={styles.icon} />
            <p className={styles.techText}>CSS3</p>
          </motion.div>

          <motion.div className={styles.techItem} variants={itemVariant} whileHover={{scale: 1.1, y: -5}} transition={{type: "spring", stiffness: 300}}>
            <FaJs className={styles.icon} />
            <p className={styles.techText}>JavaScript</p>
          </motion.div>

          <motion.div className={styles.techItem} variants={itemVariant} whileHover={{scale: 1.1, y: -5}} transition={{type: "spring", stiffness: 300}}>
            <SiTailwindcss className={styles.icon} />
            <p className={styles.techText}>Tailwind</p>
          </motion.div>

          <motion.div className={styles.techItem} variants={itemVariant} whileHover={{scale: 1.1, y: -5}} transition={{type: "spring", stiffness: 300}}>
            <FaReact className={styles.icon} />
            <p className={styles.techText}>React</p>
          </motion.div>

          <motion.div className={styles.techItem} variants={itemVariant} whileHover={{scale: 1.1, y: -5}} transition={{type: "spring", stiffness: 300}}>
            <FaNodeJs className={styles.icon} />
            <p className={styles.techText}>Node.js</p>
          </motion.div>

          <motion.div className={styles.techItem} variants={itemVariant} whileHover={{scale: 1.1, y: -5}} transition={{type: "spring", stiffness: 300}}>
            <FaGitSquare className={styles.icon} />
            <p className={styles.techText}>Git</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
