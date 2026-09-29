import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";

import styles from "./UsersPage.module.css";
import usePageHeader from "../../hooks/usePageHeader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../services/userApi";

const isProtected = (user) => {

  return Array.isArray(user.role)
    ? user.role.includes("Admin")
    : user.role === "Admin";
};

const UsersPage = () => {
  const navigate = useNavigate();
  const { data: users = [], isLoading, isError, error } = useGetUsersQuery();
  const [
    deleteUser,
    { isSuccess: isDeleted, isError: isDeleteError, error: deleteError },
  ] = useDeleteUserMutation();

  const [deletingId, setDeletingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const headerActions = useMemo(
    () => (
      <button
        type="button"
        className={styles.newButton}
        onClick={() => navigate("/admin/users/add")}
      >
        <FiPlus size={14} />
        New user
      </button>
    ),
    [navigate],
  );

  usePageHeader({
    title: "Users",
    description: "Everyone with access to this admin portal.",
    actions: headerActions,
  });

  const handleDelete = async (user) => {

    /* Ask before deleting the user */
    
    const confirmed = window.confirm(
      `Delete ${user.username}? This can't be undone.`,
    );
    if (!confirmed) return;
    setDeletingId(user._id);
    try {
      await deleteUser(user._id).unwrap();
    } catch (err) {
      console.log(`Can't delete user with ${user.username}`)
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (isDeleted) {
      setSuccessMessage("User deleted.");
      const t = setTimeout(() => setSuccessMessage(null), 4000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [isDeleted]);

  const errorMessage =
    error?.data?.message ||
    error?.error ||
    deleteError?.data?.message ||
    deleteError?.error ||
    "Failed to load users.";

  const errContent = (isError || isDeleteError) && (
    <div className={styles.errorContent} role="alert">
      <p className={styles.errorTitle}>Something went wrong</p>
      <p className={styles.errorText}>{errorMessage}</p>
    </div>
  );

  if (isLoading) {
    return <p className={styles.loadingText}>Loading users…</p>;
  }

  return (
    <>
      {errContent}

      {successMessage && (
        <div className={styles.successContent} role="status" aria-live="polite">
          <p className={styles.successTitle}>Success</p>
          <p className={styles.successText}>{successMessage}</p>
        </div>
      )}

      {users.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No users yet</p>
          <p className={styles.emptyText}>Add one to see it listed here.</p>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const protectedUser = isProtected(user);
              return (
                <tr key={user._id}>
                  <td data-label="Username">{user.username}</td>
                  <td data-label="Role">
                    <span className={styles.roleBadge}>
                      {Array.isArray(user.role)
                        ? user.role.join(", ")
                        : user.role}
                    </span>
                  </td>
                  <td data-label="Actions">
                    <div className={styles.rowActions}>
                      {protectedUser ? (
                        <span className={styles.protectedLabel}>Protected</span>
                      ) : (
                        <>
                          <Link
                            to={`/admin/users/edit/${user._id}`}
                            className={styles.rowAction}
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            className={`${styles.rowAction} ${styles.rowActionDanger}`}
                            onClick={() => handleDelete(user)}
                            disabled={deletingId === user._id}
                          >
                            {deletingId === user._id ? "Deleting…" : "Delete"}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UsersPage;
