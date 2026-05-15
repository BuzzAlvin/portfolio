import { motion } from "framer-motion";
import {
  FaReact,
  FaJs,
  FaNodeJs,
  FaHtml5,
  FaCss3,
  FaGitSquare,
} from "react-icons/fa";
import { SiTailwindcss, SiExpress } from "react-icons/si";
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

  const TechStack = [
    {icon: <FaHtml5 />, Stack: "HTML"},
    {icon: <FaCss3 />, Stack: "CSS3"},
    {icon: <FaJs />, Stack: "JavaScript"},
    {icon: <SiTailwindcss />, Stack: "Tailwindcss"},
    {icon: <FaReact />, Stack: "React"},
    {icon: <FaNodeJs />, Stack: "Node.js"},
    {icon: <SiExpress />, Stack: "Express.js"},
    {icon: <FaGitSquare />, Stack: "Git"},
  ]

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
          {TechStack.map((item, index) => (
            <motion.div key={index} className={styles.techItem} variants={itemVariant} whileHover={{scale: 1.1, y: -5}} transition={{type: "spring", stiffness: 300}}>
              <span className={styles.icon}>{item.icon}</span>
              <p className={styles.techText}>{item.Stack}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
