import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import config from '@/lib/config'
import {ReactChildren} from '@/lib/types'
import {Metadata} from 'next'
import './globals.css'

/**
 * Default metadata.
 *
 * @see https://beta.nextjs.org/docs/api-reference/metadata
 */
export const metadata: Metadata = {
  title: config.siteName,
  description: config.siteDescription
}

/**
 * The homepage root layout.
 *
 * @see https://beta.nextjs.org/docs/api-reference/file-conventions/layout
 */
export default function RootLayout({children}: ReactChildren) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header description="About" />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
