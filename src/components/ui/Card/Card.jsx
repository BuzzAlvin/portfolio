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
    <motion.div className={styles.card} variants={itemVariant} whileHover={{scale: 1.03, y:-5}}>
        <img src={project.image} alt={project.title} className={styles.img} />
      <div className={styles.container}>
        <motion.div className={styles.detailsContainer} variants={itemVariant}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.text}>
            {project.content}
          </p>
        </motion.div>
        <div className={styles.tagContainer}>
          {project.tags.map((tag, index) => (
              <Tag key={index} text={tag.name} />
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <a
            className={styles.button}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className={styles.button}
            href={project.liveDemo}
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
