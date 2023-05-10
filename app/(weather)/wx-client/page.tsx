import DisplayWeather from '@/components/wx-client/DisplayWeather'

export const runtime = 'edge'

/**
 * The weather (client) homepage.
 */
export default async function WxClientHome() {
  return <DisplayWeather />
}
