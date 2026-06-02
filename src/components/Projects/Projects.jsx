import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../Projects/Projects.module.css";
import Card from "../ui/Card/Card";
import projects from "../../Project";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Fullstack", value: "fullstack" },
    { label: "Frontend", value: "frontend" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const cardVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section id="projects" className={styles.section}>
      {/* Heading */}
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

      {/* Filter Tabs */}
      <div className={styles.filters}>
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setActiveFilter(option.value)}
            className={`${styles.filterBtn} ${
              activeFilter === option.value ? styles.active : ""
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Card Container */}
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={cardVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Card project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* No projects */}
      {filteredProjects.length === 0 && (
        <div className={styles.emptyState}>
          <p>No projects in this category yet. Check back soon! 🚀</p>
        </div>
      )}
    </section>
  );
};

export default Projects;