'use client'

import {useWeatherContext} from '@/components/wx-server/WeatherProvider'
import {useRouter} from 'next/navigation'
import slugify from 'slugify'

/**
 * The search component.
 */
export default function Search() {
  const {location, setLocation} = useWeatherContext()
  const router = useRouter()

  function searchWeather(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

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
    router.push(`/wx-server/${slugify(location, slugOptions)}`)
  }

  return (
    <form className="flex items-center justify-center gap-4 sm:justify-start">
      <label className="sr-only" htmlFor="location">
        Search Locations
      </label>
      <input
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Search Locations"
        type="text"
        value={location}
      />
      <button onClick={(e) => searchWeather(e)}>Search</button>
    </form>
  )
}
