import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./Social.module.css";

const Social = () => {
  return (
    <motion.a
      href="https://wa.me/2348125923428"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.container}
      whileHover={{ scale: 1.1, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <FaWhatsapp className={styles.icon} />
    </motion.a>
  );
};

export default Social;
