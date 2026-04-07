import styles from "../Mode/Mode.module.css";
import { FiSun, FiMoon } from "react-icons/fi";

const Mode = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <a className={styles.container} onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? <FiSun  className={styles.modeIcon}/> : <FiMoon  className={styles.modeIcon}/>}
    </a>
  );
};

export default Mode;
