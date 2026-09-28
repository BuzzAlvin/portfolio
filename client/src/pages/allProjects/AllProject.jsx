import { useMemo, useState } from "react";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import styles from "./AllProject.module.css";
import Card from "../../components/ui/Card/Card";
import { useGetProjectsQuery } from "../../services/publicProjectApi";

const CATEGORY_FILTERS = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "fullstack", label: "Fullstack" },
];

const AllProject = () => {
  const navigate = useNavigate();
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();

  /*  handleBack goes back in history when there's somewhere to go back to (the normal case — arriving via the homepage's "View all projects" link), and falls back to "/" for a direct visit (new tab, refresh, shared link) where there's no in-app history to go back to. */

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const visibleProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        category === "all" || project.category === category;
      const matchesSearch =
        query === "" || project.title.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [projects, category, search]);

  return (
    <div className={styles.page}>
      <button type="button" className={styles.backButton} onClick={handleBack}>
        <FiArrowLeft size={16} /> Back
      </button>

      <header className={styles.header}>
        <h1 className={styles.title}>All projects</h1>
        <p className={styles.subtitle}>
          Everything I've shipped, in one place.
        </p>
      </header>

      <div className={styles.controls}>
        <div
          className={styles.filters}
          role="tablist"
          aria-label="Filter by category"
        >
          {CATEGORY_FILTERS.map((option) => (
            <button
              key={option.key}
              type="button"
              role="tab"
              aria-selected={category === option.key}
              className={
                category === option.key
                  ? `${styles.filterTab} ${styles.filterTabActive}`
                  : styles.filterTab
              }
              onClick={() => setCategory(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className={styles.searchWrap}>
          <FiSearch size={16} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search projects…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search projects by title"
          />
        </div>
      </div>

      {isLoading ? (
        <p className={styles.statusText}>Loading projects…</p>
      ) : isError ? (
        <p className={styles.statusText}>
          Couldn't load projects right now — try refreshing.
        </p>
      ) : visibleProjects.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No projects match</p>
          <p className={styles.emptyText}>
            Try a different category or search term.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {visibleProjects.map((project) => (
            <Card key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProject;
