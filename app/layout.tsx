import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import config from '@/lib/config'
import {ReactChildren} from '@/lib/types'
import {Metadata} from 'next'
import './globals.css'

/**
 * Default metadata.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata
 */
export const metadata: Metadata = {
  title: config.siteName,
  description: config.siteDescription
}

/**
 * The homepage root layout.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default function RootLayout({children}: ReactChildren) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
