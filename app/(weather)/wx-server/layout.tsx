import '@/app/globals.css'
import Search from '@/components/wx-server/Search'
import Settings from '@/components/wx-server/Settings'
import WeatherProvider from '@/components/wx-server/WeatherProvider'
import config from '@/lib/config'
import {ReactChildren} from '@/lib/types'
import type {Metadata} from 'next'
import '../weather.css'

/**
 * Default metadata.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata
 */
export const metadata: Metadata = {
  title: `${config.siteName} - ${config.siteDescription}`,
  description: config.siteDescription
}

/**
 * The weather (client) root layout.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default function WeatherLayout({children}: ReactChildren) {
  return (
    <WeatherProvider>
      <Search />
      <section>{children}</section>
      <Settings />
    </WeatherProvider>
  )
}
