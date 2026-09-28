import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import styles from "../Hero/Hero.module.css";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";

const Hero = () => {
  const socialIcons = [
    { icon: <FaGithub />, path: "https://github.com/BuzzAlvin" },
    { icon: <FaLinkedin />, path: "https://linkedin.com/in/buzzalvin" },
    { icon: <FaWhatsapp />, path: "https://wa.me/2348125923428" },
    { icon: <FaTiktok />, path: "https://www.tiktok.com/buzzalvin_" },
  ];
  return (
    <motion.section
      id="home"
      className={styles.section}
      initial={{ y: -100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true }}
    >
      <div className={styles.container}>
        <div>
          <img
            src="./images/image_1.png"
            alt="Alvin"
            className={styles.imgBackground}
          />
        </div>
        <div className={styles.detailsContainer}>
          <p className={styles.greeting}>Hello, I'm </p>
          <h1 className={styles.name}>
            <ReactTyped
              strings={["Olokungbemi Eniola", "BuzzAlvin"]}
              typeSpeed={150}
              backSpeed={100}
              backDelay={1500}
              loop
            />
          </h1>
          <p className={styles.title}>Frontend Developer</p>

          <div className={styles.buttonContainer}>
            <motion.a
              href="https://drive.google.com/uc?export=download&id=1-2UBN7mpsftwZIjtt7Rb-VvaI5A89qBI"
              className={styles.downloadButton}
              target="_blank"
              rel="noopener noreferrer"
              download
              whileHover={{ scale: 1.01, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Download CV
            </motion.a>
            <a href="#contact" className={styles.contactButton}>
              Contact Me
            </a>
          </div>
          <div className={styles.socialIcons}>
            {socialIcons.map((social, index) => (
              <a
              key={index}
                href={social.path}
                className={styles.socialIconsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
           
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
