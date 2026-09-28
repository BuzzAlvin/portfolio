import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./NavBar.module.css";
import Mode from "../ui/Mode/Mode";

const NavBar = ({ isDarkMode, setIsDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const LogoMark = () => (
    <svg
      className={styles.logoMark}
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

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <section className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            <LogoMark />
          </span>

          <a className={styles.logo} href="/">
            BuzzAlvin
          </a>
        </div>

        {/* Desktop navigation */}
        <nav className={styles.desktopNav}>
          <a className={styles.navLinks} href="/#about">
            About
          </a>

          <a className={styles.navLinks} href="/#experience">
            Experience
          </a>

          <a className={styles.navLinks} href="/#projects">
            Projects
          </a>

          <a className={styles.navLinks} href="/#contact">
            Contact
          </a>

          <Mode
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </nav>

        {/* Mobile controls */}
        <div className={styles.mobileControls}>
          <Mode
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />

          <button
            type="button"
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile backdrop */}
        {menuOpen && (
          <div
            className={styles.mobileBackdrop}
            onClick={handleLinkClick}
            aria-hidden="true"
          />
        )}

        {/* Mobile menu */}
        <aside
          className={`${styles.mobileMenu} ${
            menuOpen ? styles.mobileMenuOpen : ""
          }`}
        >
          <div className={styles.mobileMenuHeader}>
            <div className={styles.brand}>
              <span className={styles.brandMark}>
                <LogoMark />
              </span>

              <span className={styles.logo}>BuzzAlvin</span>
            </div>

            <button
              type="button"
              className={styles.closeButton}
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <FiX />
            </button>
          </div>

          <nav className={styles.mobileNav}>
            <a
              className={styles.navLinks}
              href="/#about"
              onClick={handleLinkClick}
            >
              About
            </a>

            <a
              className={styles.navLinks}
              href="/#experience"
              onClick={handleLinkClick}
            >
              Experience
            </a>

            <a
              className={styles.navLinks}
              href="/#projects"
              onClick={handleLinkClick}
            >
              Projects
            </a>

            <a
              className={styles.navLinks}
              href="/#contact"
              onClick={handleLinkClick}
            >
              Contact
            </a>
          </nav>
        </aside>
      </div>
    </section>
  );
};

export default NavBar;