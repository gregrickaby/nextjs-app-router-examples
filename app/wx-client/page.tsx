import DisplayWeather from '@/components/wx-client/DisplayWeather'

export const runtime = 'experimental-edge'

/**
 * The client-side Homepage.
 */
export default async function ClientHomepage() {
  return <DisplayWeather />
}
