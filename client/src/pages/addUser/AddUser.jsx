import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { useCreateUserMutation } from "../../services/userApi";
import usePageHeader from "../../hooks/usePageHeader";
import useStableCallback from "../../hooks/useStableCallback";
import styles from "./AddUser.module.css";
import { ROLES } from "../../config/roles";

const emptyUser = {
  username: "",
  password: "",
  role: [ROLES[0]],
};

const AddUserPage = () => {
  const navigate = useNavigate();

  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();

  const errRef = useRef();

  const [values, setValues] = useState(emptyUser); //form values
  const [showPassword, setShowPassword] = useState(false);

  const update = (field, value) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleShowPassword = () => setShowPassword((value) => !value);

  const canSubmit =
    values.username.trim().length > 0 &&
    values.password.trim().length >= 8 &&
    values.role.length > 0;

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    try {
      await createUser({
        username: values.username,
        password: values.password,
        role: values.role,
      }).unwrap();

      navigate("/admin/users");
    } catch (err) {
      console.log("failed to create user.", err);
    }
  };

/*   handleCreate closes over `values`, but the header actions below are memoized on [canSubmit, isLoading] — which doesn't change when you switch roles (role.length stays 1 either way). Without this wrapper, the header's Create button would keep calling the very first handleCreate closure, submitting whatever role was selected on mount rather than whatever's selected now.
 */  const stableHandleCreate = useStableCallback(handleCreate);

  const handleCancel = () => navigate("/admin/dashboard");

  const actions = useMemo(
    () => (
      <>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="button"
          className={styles.primaryButton}
          disabled={!canSubmit || isLoading}
          onClick={stableHandleCreate}
        >
          {isLoading ? "Creating…" : "Create user"}
        </button>
      </>
    ),
    [canSubmit, isLoading, stableHandleCreate],
  );
  usePageHeader({
    title: "Add user",
    description: "Create a new account with access to this admin portal.",
    actions,
    hideActionsOnMobile: true,
  });

  const errContent =
    isError && error?.data?.message ? (
      <div className={styles.errorContent} role="alert">
        <p className={styles.errorText} ref={errRef} tabIndex={-1}>
          {error.data.message}
        </p>
      </div>
    ) : null;

  useEffect(() => {
    if (errContent) {
      errRef.current?.focus();
    }
  }, [errContent]);

  return (
    <>
      {errContent}
      <form className={styles.layout} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.mainColumn}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>User details</h2>
            <p className={styles.sectionHint}>
              Choose a username and set the account access level.
            </p>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className={styles.input}
                placeholder="e.g. buzzalvin_admin"
                autoComplete="off"
                value={values.username}
                onChange={(e) => update("username", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <div className={styles.tagInputWrap}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={styles.tagInput}
                  placeholder="At least 8 characters"
                  value={values.password}
                  onChange={(e) => update("password", e.target.value)}
                />
                <button
                  type="button"
                  className={styles.inlineIconButton}
                  onClick={toggleShowPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              <p className={styles.helperText}>
                They can change this after logging in.
              </p>
            </div>
          </section>
        </div>

        <div className={styles.sideColumn}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Access</h2>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="role">
                Role
              </label>
              <select
                id="role"
                className={styles.select}
                value={values.role[0]}
                onChange={(e) => update("role", [e.target.value])}
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <p className={styles.helperText}>
              {values.role[0] === "Admin"
                ? "Full access: projects, users, and settings."
                : values.role[0] === "Viewer"
                  ? "Read-only access to the admin portal."
                  : ""}
            </p>
          </section>
        </div>

        <div className={styles.mobileActions}>
          <button
            type="button"
            className={styles.primaryButton}
            disabled={!canSubmit || isLoading}
            onClick={stableHandleCreate}
          >
            {isLoading ? "Creating…" : "Create user"}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AddUserPage;
