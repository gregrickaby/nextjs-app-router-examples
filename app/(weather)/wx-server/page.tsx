import DisplayWeather from '@/components/wx-server/DisplayWeather'
import {getForecast} from '@/lib/queries'
import {notFound} from 'next/navigation'

/**
 * The weather (server) homepage.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */
export default async function WxServerHome() {
  // Get the weather forecast.
  const data = await getForecast('Enterprise, AL')

  // No forecast? Bail...
  if (!data) {
    notFound()
  }

  return <DisplayWeather weather={data} />
}
