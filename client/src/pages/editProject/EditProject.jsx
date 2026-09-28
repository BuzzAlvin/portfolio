import { useNavigate } from "react-router-dom";
import { useRef, useState, useMemo, useEffect } from "react";
import { FiTrash2, FiUpload } from "react-icons/fi";

import styles from "./EditProject.module.css";
import usePageHeader from "../../hooks/usePageHeader";
import useStableCallback from "../../hooks/useStableCallback";
import { useUpdateProjectMutation } from "../../services/projectApi";

const categoryOptions = [
  { value: "frontend", label: "Frontend" },
  { value: "fullstack", label: "Fullstack" },
];

const EditProject = ({ project }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [updateProject, { isLoading, isSuccess, isError, error }] =
    useUpdateProjectMutation();

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [category, setCategory] = useState(project.category);
  const [liveUrl, setLiveUrl] = useState(project.liveUrl);
  const [githubUrl, setGithubUrl] = useState(project.githubUrl);
  const [featured, setFeatured] = useState(project.featured);
  const [technologies, setTechnologies] = useState(project.technologies);
  const [techInput, setTechInput] = useState("");
  const [newImage, setNewImage] = useState(null); // only if the user changes image will this get triggered
  const [imagePreview, setImagePreview] = useState(project?.image?.url ?? null);

  const resetForm = () => {
    setTitle(project.title);
    setDescription(project.description);
    setCategory(project.category);
    setLiveUrl(project.liveUrl);
    setGithubUrl(project.githubUrl);
    setFeatured(project.featured);
    setTechnologies(project.technologies);
    setTechInput(""); // always a string
    setNewImage(null); // no new file selected
    setImagePreview(project?.image?.url ?? null); // back to the real persisted image
  };

  useEffect(() => {
    if (isSuccess) {
      resetForm();
      navigate("/admin/dashboard");
    }
  }, [isSuccess, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setNewImage(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addTechnology = (e) => {
    e.preventDefault();
    const tech = techInput.trim();

    if (!tech || technologies.includes(tech)) {
      setTechInput("");
      return;
    }

    setTechnologies((current) => [...current, tech]);
    setTechInput("");
  };

  const removeTechnology = (tech) => {
    setTechnologies((current) => current.filter((item) => item !== tech));
  };

  const canPublish =
    title.trim() !== "" &&
    description.trim() !== "" &&
    category !== "" &&
    githubUrl.trim() !== "" &&
    liveUrl.trim() !== "" &&
    imagePreview !== null &&
    technologies.length > 0;

  const handleSubmit = async (e, projectStatus) => {
    e.preventDefault();

    if (!canPublish) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("liveUrl", liveUrl);
    formData.append("githubUrl", githubUrl);
    formData.append("featured", String(featured));
    formData.append("status", projectStatus);

    if (newImage) {
      formData.append("image", newImage);
    }

    technologies.forEach((tech) => {
      formData.append("technologies", tech);
    });

    try {
      await updateProject({ id: project._id, project: formData }).unwrap();
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  };

  const handleDiscard = () => {
    resetForm();
    navigate("/admin/dashboard");
  };

  //useCallBack Hook
  const stableHandleSubmit = useStableCallback(handleSubmit);

  const errorMessage = error?.data?.message || error?.error;

  const errContent = isError && errorMessage && (
    <p className={styles.errorMessage}>{errorMessage}</p>
  );

  const headerActions = useMemo(
    () => (
      <>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={(e) => stableHandleSubmit(e, "draft")}
        >
          Save draft
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          disabled={!canPublish || isLoading}
          onClick={(e) => stableHandleSubmit(e, "published")}
        >
          {isLoading ? "Updating..." : "Update project"}
        </button>
      </>
    ),
    [canPublish, isLoading, stableHandleSubmit],
  );

  usePageHeader({
    title: "Edit project",
    description:
      "Update this project details, visuals, and links while keeping your portfolio accurate and polished.",
    actions: headerActions,
  });

  return (
    <>
      {errContent}
      <form className={styles.layout} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.mainColumn}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Identity &amp; concept</h2>
            <p className={styles.sectionHint}>
              The core details that define this project in the gallery.
            </p>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="title">
                Project title
              </label>
              <input
                id="title"
                type="text"
                className={styles.input}
                placeholder="e.g. Neo-Banking Dashboard 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                rows={6}
                className={styles.textarea}
                placeholder="Describe the project, what it does, and key features…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Links &amp; resources</h2>
            <p className={styles.sectionHint}>
              Where can people find the code or the live application?
            </p>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="liveUrl">
                  Live demo URL
                </label>
                <input
                  id="liveUrl"
                  type="url"
                  className={styles.input}
                  placeholder="https://your-project.com"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="githubUrl">
                  GitHub repository
                </label>
                <input
                  id="githubUrl"
                  type="url"
                  className={styles.input}
                  placeholder="https://github.com/username/project"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>
            </div>
          </section>
        </div>

        <div className={styles.sideColumn}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Visual representation</h2>
            <p className={styles.sectionHint}>
              High-quality thumbnails drive most project clicks.
            </p>

            <div className={styles.thumbnailBox}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt=""
                  className={styles.thumbnailImage}
                />
              ) : (
                <div className={styles.thumbnailPlaceholder}>
                  No image uploaded
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              className={styles.fileInput}
              id="image"
            />

            <div className={styles.thumbnailActions}>
              <label htmlFor="image" className={styles.uploadButton}>
                <FiUpload size={16} />{" "}
                {imagePreview ? "Replace image" : "Upload image"}
              </label>
              {imagePreview ? (
                <button
                  type="button"
                  className={styles.deleteIconButton}
                  onClick={removeImage}
                  aria-label="Remove image"
                >
                  <FiTrash2 size={16} />
                </button>
              ) : null}
            </div>

            <p className={styles.helperText}>
              Recommended: 1200×800px. Supports WEBP, PNG, JPG.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Project details</h2>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="tech">
                Tech stack
              </label>
              <div className={styles.tagInputWrap}>
                <input
                  id="tech"
                  type="text"
                  className={styles.tagInput}
                  placeholder="Press Enter to add…"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addTechnology(e);
                  }}
                />
              </div>
              {technologies.length > 0 ? (
                <ul className={styles.tagList}>
                  {technologies.map((tech) => (
                    <li key={tech} className={styles.tag}>
                      {tech}
                      <button
                        type="button"
                        className={styles.tagRemove}
                        onClick={() => removeTechnology(tech)}
                        aria-label={`Remove ${tech}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <label className={styles.toggleRow} htmlFor="featured">
              <span>
                <span className={styles.toggleLabel}>Featured project</span>
                <span className={styles.toggleHint}>
                  Display this project at the top of the portfolio.
                </span>
              </span>
              <span className={styles.switch}>
                <input
                  id="featured"
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                <span className={styles.switchTrack} aria-hidden="true" />
              </span>
            </label>
          </section>
        </div>
      </form>

      <div className={styles.footerBar}>
        <span className={styles.footerNote}>
          {canPublish
            ? "Ready to publish."
            : "Project title and description are required to publish."}
        </span>
        <button
          type="button"
          className={styles.discardLink}
          onClick={handleDiscard}
        >
          Discard changes
        </button>
      </div>
    </>
  );
};

export default EditProject;
