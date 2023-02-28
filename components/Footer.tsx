import config from "@/lib/config";

export default function Footer() {
  return (
    <footer className="footerContainer">
      <p>{config.siteCredits}</p>
    </footer>
  );
}
