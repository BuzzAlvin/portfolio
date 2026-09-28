import { Link } from "react-router-dom";
import usePageHeader from "../../hooks/usePageHeader";
import styles from "./Settings.module.css";


const SettingsPage = () => {
  usePageHeader({
    title: "Settings",
  });

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Account</h3>
        <ul className={styles.list}>
          <li>
            <Link to="/admin/users" className={styles.link}>
              View all users
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default SettingsPage;
