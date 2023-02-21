import config from "@/lib/config";
import type { Metadata } from "next";

export const runtime = "experimental-edge";
export const metadata: Metadata = {
  title: "About",
  description: config.siteDescription,
};

/**
 * The About page.
 *
 * @see https://beta.nextjs.org/docs/routing/pages-and-layouts
 */
export default async function About() {
  return (
    <>
      <h1>About</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
        debitis aut totam mollitia, eligendi, amet cum reprehenderit, tempore
        vero labore quo suscipit sint quis dicta eius veritatis earum atque
        quae.
      </p>
      <small>server component. edge runtime. streaming render.</small>
    </>
  );
}
