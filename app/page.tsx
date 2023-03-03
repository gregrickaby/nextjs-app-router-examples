import DisplayWeather from '@/components/DisplayWeather'
import {getForecast} from '@/lib/functions'

export const runtime = 'experimental-edge'

/**
 * The Homepage.
 *
 * @see https://beta.nextjs.org/docs/routing/pages-and-layouts
 */
export default async function Homepage() {
  const {weather} = await getForecast('Enterprise, AL')

  return (
    <>
      <h1>Current Conditions</h1>
      <DisplayWeather weather={weather} />
    </>
  )
}
