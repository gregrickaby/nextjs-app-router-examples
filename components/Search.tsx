'use client'

import {useRouter} from 'next/navigation'
import slugify from 'slugify'
import {useWeatherContext} from './WeatherProvider'

/**
 * The search component.
 */
export default function Search() {
  const {location, setLocation} = useWeatherContext()
  const router = useRouter()

  function searchWeather() {
    /**
     * Slugify options.
     *
     * @see https://www.npmjs.com/package/slugify
     */
    const slugOptions = {
      lower: true,
      trim: true
    }

    // Send user to the search results.
    router.push(`/${slugify(location, slugOptions)}`)
  }

  return (
    <div className="search">
      <label className="sr-only" htmlFor="location">
        Search Locations
      </label>
      <input
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Search Locations"
        type="text"
        value={location}
      />
      <button onClick={() => searchWeather()}>Search</button>
    </div>
  )
}
