import config from "@/lib/config";
import Link from "next/link";
import Search from "./Search";
import Settings from "./Settings";

export default function Header() {
  return (
    <header className="headerContainer">
      <div className="column">
        <h1>
          <Link href="/">{config.siteName}</Link>
        </h1>
        <p>{config.siteDescription}</p>
      </div>
      <div className="column">
        <div className="row">
          <Search />
          <Settings />
        </div>
      </div>
    </header>
  );
}
