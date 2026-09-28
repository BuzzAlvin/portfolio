import { useNavigate } from "react-router-dom";
import { useRef, useState, useMemo, useEffect } from "react";
import { FiTrash2, FiUpload } from "react-icons/fi";

import styles from "./AddProject.module.css";
import usePageHeader from "../../hooks/usePageHeader";
import useStableCallback from "../../hooks/useStableCallback";
import { useCreateProjectMutation } from "../../services/projectApi";

const categoryOptions = [
  { value: "frontend", label: "Frontend" },
  { value: "fullstack", label: "Fullstack" },
];

const AddProject = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [createProject, { isLoading, isSuccess, isError, error }] =
    useCreateProjectMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("frontend");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const [techInput, setTechInput] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("frontend");
    setLiveUrl("");
    setGithubUrl("");
    setFeatured(false);
    setTechnologies([]);
    setTechInput("");
    setImage(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
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
    image !== null &&
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

    if (image) {
      formData.append("image", image);
    }

    technologies.forEach((tech) => {
      formData.append("technologies", tech);
    });

    try {
      await createProject(formData).unwrap();
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

  const errContent = isError && error?.data?.message && (
    <p className={styles.errorMessage}>{error.data.message}</p>
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
          {isLoading ? "Publishing..." : "Publish project"}
        </button>
      </>
    ),
    [canPublish, isLoading, stableHandleSubmit],
  );

  usePageHeader({
    title: "Add project",
    description:
      "Add a new masterpiece to your portfolio. High-quality imagery and a clear case study drive engagement.",
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

export default AddProject;
