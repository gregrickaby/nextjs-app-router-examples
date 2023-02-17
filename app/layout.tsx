import Nav from "@/components/Nav";
import type { Metadata } from "next";
import "./globals.css";

/**
 * Default metadata.
 *
 * @see https://beta.nextjs.org/docs/api-reference/metadata
 */
export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "%s | Next.js App Directory Sandbox",
  },
  description: "Welcome to the Next.js App Directory Sandbox",
};

/**
 * The root layout.
 *
 * @see https://beta.nextjs.org/docs/api-reference/file-conventions/layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <Nav />
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
