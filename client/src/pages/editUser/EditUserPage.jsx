import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import usePageHeader from "../../hooks/usePageHeader";
import {
  useUpdateUserMutation,
} from "../../services/userApi";
import { ROLES } from "../../config/roles";

import styles from "./EditUserPage.module.css";

const EditUserPage = ({ user }) => {
  const navigate = useNavigate();

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Viewer");



  usePageHeader({
    title: "Edit user",
    description: "Update this user's account details.",
  });

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setRole(
        Array.isArray(user.role)
          ? user.role[0] || "Viewer"
          : user.role || "Viewer",
      );
    }
  }, [user]);

  const canUpdate =
    username.trim().length > 0 &&
    (password.trim() === "" || password.trim().length >= 8) &&
    role.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canUpdate) return;

    const updatedUser = {
      username: username.trim(),
      role: [role],
    };

    // Only send password when a new password was entered.
    if (password.trim()) {
      updatedUser.password = password.trim();
    }

    try {
      await updateUser({ id: user._id, user: updatedUser }).unwrap();

      setPassword("");
    } catch (err) {
      console.log("UPDATE USER ERROR:", err);
      console.log("ERROR DATA:", err?.data);
      console.log("ERROR STATUS:", err?.status);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/users");
    }
  }, [isSuccess, navigate]);

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Account</h2>

        <p className={styles.sectionSubtitle}>
          Update this user's username, password, or role.
        </p>

        <form className={styles.card} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              New password
            </label>

            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              autoComplete="new-password"
            />

            <p className={styles.hintText}>
              Leave this blank if you don't want to change the password.
            </p>
          </div>

          {password.length > 0 && password.length < 8 && (
            <p className={styles.hintText}>
              Password must be at least 8 characters.
            </p>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="role">
              Role
            </label>

            <select
              id="role"
              className={styles.select}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {ROLES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {isError && (
            <p className={styles.errorText}>
              {error?.data?.message || error?.error || "Couldn't update user."}
            </p>
          )}

          {isSuccess && (
            <p className={styles.successText}>User updated successfully.</p>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate("/admin/users")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.primaryButton}
              disabled={!canUpdate || isLoading}
            >
              {isLoading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditUserPage;
