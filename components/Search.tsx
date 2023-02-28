"use client";

import { useRouter } from "next/navigation";
import slugify from "slugify";
import { useWeatherContext } from "./WeatherProvider";

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
  const { location, setLocation } = useWeatherContext();
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
    router.push(`/${slugify(location, slugOptions)}`);
  }

  return (
    <form className="searchForm">
      <label className="sr-only" htmlFor="location">
        Search Locations
      </label>
      <input
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Search Locations"
        type="text"
        value={location}
      />
      <button onClick={(e) => handleSubmit(e)}>Search</button>
    </form>
  );
}
