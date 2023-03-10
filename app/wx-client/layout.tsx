import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import Search from '@/components/wx-client/Search'
import Settings from '@/components/wx-client/Settings'
import WeatherProvider from '@/components/wx-client/WeatherProvider'
import config from '@/lib/config'
import {ReactChildren} from '@/lib/types'
import type {Metadata} from 'next'
import '../globals.css'
import '../wx-server/weather.css'

/**
 * Default metadata.
 *
 * @see https://beta.nextjs.org/docs/api-reference/metadata
 */
export const metadata: Metadata = {
  title: `${config.siteName} - ${config.siteDescription}`,
  description: config.siteDescription
}

/**
 * The weather (client) root layout.
 *
 * @see https://beta.nextjs.org/docs/api-reference/file-conventions/layout
 */
export default function RootLayout({children}: ReactChildren) {
  return (
    <html lang="en">
      <head />
      <body>
        <WeatherProvider>
          <Header description="Weather (Client)" />
          <Search />
          <main>{children}</main>
          <Footer />
          <Settings />
        </WeatherProvider>
      </body>
    </html>
  )
}
