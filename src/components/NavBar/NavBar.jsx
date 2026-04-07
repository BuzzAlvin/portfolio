import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./NavBar.module.css";
import Mode from "../ui/Mode/Mode";

const NavBar = ({ isDarkMode, setIsDarkMode }) => {
  const [menuOpen, setmenuOpen] = useState(false);

  const toggleMenu = () => {
    setmenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setmenuOpen(false);
  };

  return (
    <section className={styles.navbar}>
      <div className={styles.container}>
        <h2>
          <a className={styles.logo} href="home">
            BuzzAlvin
          </a>
        </h2>

        <div className={styles.modeContainer}>
          <div className={styles.mobile}>
            <Mode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>

          <div className={styles.menuIcon} onClick={toggleMenu}>
            {menuOpen ? (
              <FiX className={styles.icon} />
            ) : (
              <FiMenu className={styles.icon} />
            )}
          </div>
        </div>

        <ul className={`${styles.navitem} ${menuOpen ? "" : styles.active}`}>
          <a
            className={styles.navLinks}
            href="#about"
            onClick={handleLinkClick}
          >
            About
          </a>

          <a
            className={styles.navLinks}
            href="#experience"
            onClick={handleLinkClick}
          >
            Experience
          </a>

          <a
            className={styles.navLinks}
            href="#projects"
            onClick={handleLinkClick}
          >
            Projects
          </a>

          <a
            className={styles.navLinks}
            href="#contact"
            onClick={handleLinkClick}
          >
            Contact
          </a>

          <div className={styles.desktop}>
            <Mode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
        </ul>
      </div>
    </section>
  );
};

export default NavBar;
