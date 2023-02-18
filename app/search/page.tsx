"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import slugify from "slugify";

/**
 * The Search page.
 *
 * Note: because this component uses state, it must be a client component.
 * This also means metadata cannot be generated for this page. If you need
 * to generate metadata for a page that uses state, you must use a server
 * component e.g., app/search/layout.tsx. Additionally, because it uses an NPM
 * package, it must run on the node runtime.
 *
 * @see https://beta.nextjs.org/docs/rendering/server-and-client-components#client-components
 */
export default function Search() {
  const [location, setLocation] = useState("");
  const router = useRouter();

  function handleSubmit(e: any) {
    e.preventDefault();

    /**
     * Slugify options.
     *
     * @see https://www.npmjs.com/package/slugify
     */
    const slugOptions = {
      lower: true,
      trim: true,
    };

    // Send user to the search results.
    router.push(`/search/${slugify(location, slugOptions)}`);
  }

  return (
    <>
      <h1>Weather Search</h1>
      <form>
        <label htmlFor="location">Enter a city and state</label>
        <input
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enterprise, AL"
          type="text"
          value={location}
        />
        <button onClick={(e) => handleSubmit(e)}>Search</button>
      </form>
      <small>client component. node runtime. static render.</small>
    </>
  );
}
