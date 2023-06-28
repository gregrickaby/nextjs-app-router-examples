'use client'

import {useWeatherContext} from '@/components/wx-client/WeatherProvider'

/**
 * The search component.
 */
export default function Search() {
  const {location, setLocation, setWeather} = useWeatherContext()

  /**
   * Search handler.
   */
  async function searchWeather(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const response = await fetch(`/api/weather/?location=${location}`)
      const data = await response.json()
      setWeather(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      className="flex items-center justify-center gap-4 sm:justify-start"
      onSubmit={searchWeather}
    >
      <label className="sr-only" htmlFor="location">
        Search Locations
      </label>
      <input
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Search Locations"
        type="text"
        value={location}
      />
      <button type="submit">Search</button>
    </form>
  )
}
