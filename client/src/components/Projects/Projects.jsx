import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import styles from "../Projects/Projects.module.css";
import Card from "../ui/Card/Card";
import { useGetProjectsQuery } from "../../services/publicProjectApi";

const Projects = () => {
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = useGetProjectsQuery(undefined, { refetchOnMountOrArgChange: true });

  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Fullstack", value: "fullstack" },
    { label: "Frontend", value: "frontend" },
  ];

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <ClipLoader />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return <p className={styles.errorMsgContainer}>Failed to load projects.</p>;
  }

  const handleFilterChange = (value) => {
    setActiveFilter(value);
  };

  const allProjectClicked = () => {
    navigate("/projects");
  };

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const visibleProjects = filteredProjects.slice(0, 3);

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
            onClick={() => handleFilterChange(option.value)}
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
            {visibleProjects.map((project) => (
              <motion.div
                key={project._id}
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

{/* Show all button */}
      {filteredProjects.length > 3 && (
        <button onClick={allProjectClicked} className={styles.viewAllBtn}>
          View All Projects
          <span className={styles.arrow}>→</span>
        </button>
      )}

      {/* No projects */}
      {filteredProjects.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateCard}>
            <p className={styles.emptyStateTitle}>
              No projects in this category yet
            </p>
            <p className={styles.emptyStateText}>
              Check back soon for fresh work and case studies.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
