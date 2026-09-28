import { motion } from "framer-motion";
import styles from "../Card/Card.module.css";
import Tag from "../Tag/Tag";

const Card = ({ project }) => {
  const itemVariant = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={styles.card}
      variants={itemVariant}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      {/* card image */}
      <img src={project.image.url} alt={project.title} className={styles.img} />

      <div className={styles.container}>
        <motion.div className={styles.detailsContainer} variants={itemVariant}>
          {/* title */}
          <h3 className={styles.title}>{project.title}</h3>
          {/* description */}
          <p className={styles.text}>{project.description}</p>
        </motion.div>
        {/* Tags/technologies */}
        <div className={styles.tagContainer}>
          {project.technologies.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <a
            className={styles.button}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className={styles.button}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
