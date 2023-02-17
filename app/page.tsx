// https://beta.nextjs.org/docs/rendering/edge-and-nodejs-runtimes#edge-runtime
export const runtime = "experimental-edge";

/**
 * The homepage.
 *
 * @see https://beta.nextjs.org/docs/routing/pages-and-layouts#pages
 */
export default function Homepage() {
  return (
    <>
      <h1>Hello 👋</h1>
      <p>Welcome to the Next.js App Directory Sandbox</p>
    </>
  );
}
