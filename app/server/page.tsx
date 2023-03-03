import DisplayWeather from '@/components/server/DisplayWeather'
import {getForecast} from '@/lib/functions'
import {Suspense} from 'react'

export const runtime = 'experimental-edge'

/**
 * The server-side Homepage.
 *
 * @see https://beta.nextjs.org/docs/routing/pages-and-layouts
 */
export default async function ServerHomepage() {
  // Get the weather forecast.
  const {weather} = await getForecast('Enterprise, AL')

  return (
    <>
      <h1>Current Conditions</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DisplayWeather weather={weather} />
      </Suspense>
    </>
  )
}
