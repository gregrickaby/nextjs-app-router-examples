import DisplayWeather from '@/components/wx-server/DisplayWeather'
import {getForecast} from '@/lib/functions'
import {LocationPageProps} from '@/lib/types'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'

export const runtime = 'experimental-edge'

/**
 * Generate dynamic metadadta.
 *
 * @see https://beta.nextjs.org/docs/guides/seo#dynamic-metadata
 */
export async function generateMetadata({
  params
}: LocationPageProps): Promise<Metadata> {
  // Get the forecast for the location.
  const forecast = await getForecast(params.location)

  return {
    title: `Search Results - ${forecast.address}`,
    description: `The local forecast for ${forecast.address}`
  }
}

/**
 * The weather (server) search results page.
 *
 * This page is a dynamic segment, so it will display the forecast
 * for any location provided in the URL.
 *
 * @see https://beta.nextjs.org/docs/routing/defining-routes#dynamic-segments
 */
export default async function SearchResults({params}: LocationPageProps) {
  // Get the forecast for the location.
  const {weather} = await getForecast(params.location)

  // No forecast? Bail...
  if (!weather) {
    notFound()
  }

  return <DisplayWeather weather={weather} />
}
