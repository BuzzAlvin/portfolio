import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

import styles from "./DashboardPage.module.css";
import usePageHeader from "../../hooks/usePageHeader";
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from "../../services/projectApi";
import useAuth from "../../hooks/useAuth";

const StarIcon = ({ filled }) =>
  filled ? <FaStar size={14} /> : <FaRegStar size={14} />;

const DashboardPage = () => {
  const { isAdmin } = useAuth();

  const { id } = useParams();

  const {
    data: projects = [],
    isLoading,
    isError,
    error,
  } = useGetProjectsQuery();

  const [
    deleteProject,
    { isSuccess: isProjectDeleted, isError: isDeleteError, error: deleteError },
  ] = useDeleteProjectMutation();

  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [successMessage, setSuccessMessage] = useState(null);
  const headerActions = useMemo(
    () => (
      <button
        type="button"
        className={styles.newButton}
        onClick={() => navigate("/admin/projects/add")}
      >
        <FiPlus size={14} />
        New project
      </button>
    ),
    [navigate],
  );

  usePageHeader({
    title: "Projects",
    description: "Everything in your portfolio, in one place.",
    actions: headerActions,
  });

  const filterOptions = [
    { key: "all", label: "All" },
    { key: "published", label: "Published" },
    { key: "draft", label: "Drafts" },
    { key: "featured", label: "Featured" },
  ];

  const stats = useMemo(
    () => ({
      total: projects.length,
      published: projects.filter((p) => p.status === "published").length,
      drafts: projects.filter((p) => p.status === "draft").length,
      featured: projects.filter((p) => p.featured).length,
    }),
    [projects],
  );

  const visibleProjects = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "featured") return projects.filter((p) => p.featured);
    return projects.filter((p) => p.status === filter);
  }, [projects, filter]);

  const onDeleteClicked = async (id) => {
    /* Ask before deleting user */
    const confirmed = window.confirm(
      `Delete ${projects.title}? This can't be undone.`,
    );
    if (!confirmed) return;

    try {
      await deleteProject(id);
    } catch (err) {
      console.log(`Error deleting project: ${projects.title}`);
    }
  };

  const errContent =
    isError || isDeleteError
      ? error?.data?.message ||
        deleteError?.data?.message ||
        "Failed to load projects."
      : null;

  useEffect(() => {
    if (isProjectDeleted) {
      setSuccessMessage("Project deleted successfully");
      const t = setTimeout(() => setSuccessMessage(null), 4000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [isProjectDeleted]);

  return (
    <>
      {errContent ? (
        <div className={styles.errorContent} role="alert">
          <p className={styles.errorText}>{errContent}</p>
        </div>
      ) : null}

      {successMessage ? (
        <div className={styles.successContent} role="status" aria-live="polite">
          <p className={styles.successTitle}>Success</p>
          <p className={styles.successText}>{successMessage}</p>
        </div>
      ) : null}

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total projects</span>
          <span className={styles.statValue}>{stats.total}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Published</span>
          <span className={styles.statValue}>{stats.published}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Drafts</span>
          <span className={styles.statValue}>{stats.drafts}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Featured</span>
          <span className={styles.statValue}>{stats.featured}</span>
        </div>
      </div>

      <div
        className={styles.filters}
        role="tablist"
        aria-label="Filter projects"
      >
        {filterOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            role="tab"
            aria-selected={filter === option.key}
            className={
              filter === option.key
                ? `${styles.filterTab} ${styles.filterTabActive}`
                : styles.filterTab
            }
            onClick={() => setFilter(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {visibleProjects.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No projects here yet</p>
          <p className={styles.emptyText}>
            Add a project to see it listed on this tab.
          </p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Status</th>
                <th>Updated</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {visibleProjects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <div className={styles.projectCell}>
                      <StarIcon filled={project.featured} />
                      <div>
                        <p className={styles.projectTitle}>{project.title}</p>
                        <p className={styles.projectSummary}>
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.mutedCell}>{project.category}</td>
                  <td>
                    <span
                      className={
                        project.status === "published"
                          ? `${styles.statusBadge} ${styles.statusPublished}`
                          : `${styles.statusBadge} ${styles.statusDraft}`
                      }
                    >
                      {project.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className={styles.mutedCell}>{project.updatedAt}</td>
                  <td>
                    {isAdmin && (
                      <div className={styles.rowActions}>
                        <button
                          type="button"
                          className={styles.rowAction}
                          onClick={() =>
                            navigate(`/admin/projects/edit/${project._id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className={`${styles.rowAction} ${styles.rowActionDanger}`}
                          onClick={() => onDeleteClicked(project._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
