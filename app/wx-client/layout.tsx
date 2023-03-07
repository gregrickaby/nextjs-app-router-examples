import Header from '@/components/Header'
import Footer from '@/components/wx-client/Footer'
import Search from '@/components/wx-client/Search'
import Settings from '@/components/wx-client/Settings'
import WeatherProvider from '@/components/wx-client/WeatherProvider'
import config from '@/lib/config'
import {ReactChildren} from '@/lib/types'
import type {Metadata} from 'next'
import '../globals.css'

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
 * The client-side root layout.
 *
 * @see https://beta.nextjs.org/docs/api-reference/file-conventions/layout
 */
export default function RootLayout({children}: ReactChildren) {
  return (
    <html lang="en">
      <head />
      <body>
        <WeatherProvider>
          <Header />
          <Search />
          <main>{children}</main>
          <Footer />
          <Settings />
        </WeatherProvider>
      </body>
    </html>
  )
}
