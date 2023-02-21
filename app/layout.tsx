import Footer from "@/components/Footer";
import Header from "@/components/Header";
import config from "@/lib/config";
import type { Metadata } from "next";
import "./globals.css";

/**
 * Default metadata.
 *
 * @see https://beta.nextjs.org/docs/api-reference/metadata
 */
export const metadata: Metadata = {
  title: {
    default: config.siteName,
    template: `%s - ${config.siteDescription}`,
  },
  description: config.siteDescription,
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
