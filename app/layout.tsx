import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WeatherProvider from "@/components/WeatherProvider";
import config from "@/lib/config";
import { ReactChildren } from "@/lib/types";
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
export default function RootLayout({ children }: ReactChildren) {
  return (
    <html lang="en">
      <head />
      <body>
        <WeatherProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </WeatherProvider>
      </body>
    </html>
  );
}
