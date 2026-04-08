import { motion } from "framer-motion";
import styles from "../Projects/Projects.module.css";
import Card from "../ui/Card/Card";
import projects from "../../Project";

const Projects = () => {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section
      id="projects"
      className={styles.section}
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        className={styles.heading}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
      >
        <p className={styles.text}>Browse My Recent</p>
        <h2 className={styles.title}>Projects</h2>
      </motion.div>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          {projects.map((project) => {
            return <Card key={project.id} project={project} />;
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
