import { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { FiBell, FiChevronDown, FiX, FiMenu } from "react-icons/fi";

import { useSendLogOutMutation } from "../../services/auth/authApi";
import Mode from "../../components/ui/Mode/Mode";
import styles from "./AdminLayout.module.css";
import useAuth from "../../hooks/useAuth";

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    to: "/admin/dashboard",
    allowedRoles: ["Admin", "Viewer"],
  },
  {
    key: "projects",
    label: "Projects",
    to: "/admin/projects/add",
    allowedRoles: ["Admin"],
  },
  {
    key: "users",
    label: "Add Users",
    to: "/admin/users/add",
    allowedRoles: ["Admin"],
  },
  {
    key: "settings",
    label: "Settings",
    to: "/admin/settings",
    allowedRoles: ["Admin"],
  },
];

const LogoMark = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    aria-hidden="true"
  >
    <rect x="1" y="1" width="7" height="7" fill="currentColor" />
    <rect x="10" y="1" width="7" height="7" fill="currentColor" />
    <rect x="1" y="10" width="7" height="7" fill="currentColor" />
    <rect x="10" y="10" width="7" height="7" fill="currentColor" />
  </svg>
);

const AdminLayout = ({ isDarkMode, setIsDarkMode }) => {
  const { status, role, isAdmin } = useAuth();
  const [sendLogOut, { isLoading, isSuccess, isError, error }] =
    useSendLogOutMutation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [pageInfo, setPageInfo] = useState({
    title: "Dashboard",
    description: "Manage your portfolio from one place.",
    actions: null,
    hideActionsOnMobile: false,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const handleLogout = async () => {
    if (isError) return console.log(error);

    try {
      await sendLogOut().unwrap();
    } catch (err) {
      console.log(err.data?.message || "error Signing out");
    }
  };

  const errContent = isError ? <p>{error.data?.message}</p> : null;

  return (
    <div className={styles.shell}>
      {errContent}
      {/* Desktop & Tablets */}
      <aside className={styles.sidebar}>
        <Link to="/admin/dashboard" className={styles.brand}>
          <span className={styles.brandMark}>
            <LogoMark />
          </span>
          <span className={styles.brandName}>
            BuzzAlvin <span className={styles.brandFaded}>Admin</span>
          </span>
        </Link>

        {/* Mobile Hamburger */}

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <FiMenu size={22} />
        </button>

        <nav className={styles.nav} aria-label="Admin navigation">
          {NAV_ITEMS.filter((item) =>
            item.allowedRoles.some((allowedRoles) =>
              role.includes(allowedRoles),
            ),
          ).map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              end={item.key === "dashboard"}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.navLinkActive}`
                  : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link to="/" className={styles.backLink}>
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Aside for mobile */}
      {mobileMenuOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`${styles.mobileMenu} ${
          mobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuHeader}>
          <Link
            to="/admin/dashboard"
            className={styles.brand}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className={styles.brandMark}>
              <LogoMark />
            </span>

            <span className={styles.brandName}>
              BuzzAlvin <span className={styles.brandFaded}>Admin</span>
            </span>
          </Link>

          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>
        </div>

        <nav className={styles.mobileNav} aria-label="Mobile admin navigation">
          {NAV_ITEMS.filter((item) =>
            item.allowedRoles.some((allowedRole) => role.includes(allowedRole)),
          ).map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              end={item.key === "dashboard"}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.navLinkActive}`
                  : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.mobileMenuFooter}>
          <Link
            to="/"
            className={styles.backLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.title}>{pageInfo.title}</h1>
            {pageInfo.description ? (
              <p className={styles.description}>{pageInfo.description}</p>
            ) : null}
          </div>

          <div className={styles.topbarRight}>
            {isAdmin && pageInfo.actions && (
              <div className={styles.actions}>{pageInfo.actions}</div>
            )}

            {/* Theme button */}
            <Mode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            <button
              type="button"
              className={styles.iconButton}
              aria-label="Notifications"
            >
              <FiBell size={18} />
            </button>

            <div className={styles.userMenu}>
              <span className={styles.roleBadge}>{status}</span>
              <button
                type="button"
                className={styles.userButton}
                onClick={() => setMenuOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                <span className={styles.avatar}>AL</span>
                <FiChevronDown size={12} />
              </button>

              {menuOpen ? (
                <div className={styles.userDropdown} role="menu">
                  {isAdmin && (
                    <Link
                      to="/admin/settings"
                      role="menuitem"
                      className={styles.userDropdownItem}
                    >
                      Settings
                    </Link>
                  )}
                  <button
                    type="button"
                    role="menuitem"
                    className={styles.userDropdownItem}
                    onClick={handleLogout}
                  >
                    {isLoading ? "Signing Out..." : "Sign out"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main className={styles.content}>
          <Outlet context={{ setPageInfo }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
