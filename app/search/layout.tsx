import Nav from "@/components/Nav";
import type { Metadata } from "next";

/**
 * Default metadata.
 *
 * @see https://beta.nextjs.org/docs/api-reference/metadata
 */
export const metadata: Metadata = {
  title: {
    default: "Weather Search",
    template: "%s - Next.js App Directory Sandbox",
  },
  description: "Search for weather forecasts in your local area.",
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
