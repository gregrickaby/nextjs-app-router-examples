import DisplayWeather from '@/components/client/DisplayWeather'

export const runtime = 'experimental-edge'

/**
 * The client-side Homepage.
 */
export default async function ClientHomepage() {
  return <DisplayWeather />
}
