"use client";

import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import slugify from "slugify";

export const metadata: Metadata = {
  title: "Search",
  description: "Search for your local forecast",
};

/**
 * The Search page.
 *
 * Because this component uses state, it must be a client component.
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
