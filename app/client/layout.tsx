import Footer from '@/components/client/Footer'
import Search from '@/components/client/Search'
import Settings from '@/components/client/Settings'
import WeatherProvider from '@/components/client/WeatherProvider'
import Header from '@/components/Header'
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
