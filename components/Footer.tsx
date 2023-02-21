import config from "@/lib/config";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <p>{config.siteCredits}</p>
    </footer>
  );
}
