import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <p className={styles.footer}>
      Copyright &copy; {currentYear} BuzzAlvin. All rights reserved.
    </p>
  )
};

export default Footer;
