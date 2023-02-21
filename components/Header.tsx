import config from "@/lib/config";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        <Link href="/">{config.siteName}</Link>
      </h1>
      <nav>
        <ul className={styles.nav}>
          {config?.nav?.map((item, index) => (
            <li key={index}>
              <Link className={styles.navItem} href={item.url}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
