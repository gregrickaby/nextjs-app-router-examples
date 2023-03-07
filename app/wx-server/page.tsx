import DisplayWeather from '@/components/wx-server/DisplayWeather'
import {getForecast} from '@/lib/functions'
import {notFound} from 'next/navigation'

export const runtime = 'experimental-edge'

/**
 * The server-side Homepage.
 *
 * @see https://beta.nextjs.org/docs/routing/pages-and-layouts
 */
export default async function ServerHomepage() {
  // Get the weather forecast.
  const {weather} = await getForecast('Enterprise, AL')

  // No forecast? Bail...
  if (!weather) {
    notFound()
  }

  return <DisplayWeather weather={weather} />
}
