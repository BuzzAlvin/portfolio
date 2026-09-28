import styles from "../Tag/Tag.module.css";

const Tag = ({ text }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Tag;
