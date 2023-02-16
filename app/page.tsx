import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "experimental-edge";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function Home() {
  return (
    <>
      <h1>Hello 👋</h1>
      <Link href="/forecast">Forecast Page</Link>
    </>
  );
}
