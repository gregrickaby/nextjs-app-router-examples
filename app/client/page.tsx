import DisplayClientWeather from '@/components/client/DisplayWeather'

export const runtime = 'experimental-edge'

/**
 * The client-side Homepage.
 */
export default async function ClientHomepage() {
  return (
    <>
      <h1>Current Conditions</h1>
      <DisplayClientWeather />
    </>
  )
}
