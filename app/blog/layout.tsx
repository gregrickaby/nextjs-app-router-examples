import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import {ReactChildren} from '@/lib/types'
import type {Metadata} from 'next'
import '../globals.css'

/**
 * Default metadata.
 *
 * @see https://beta.nextjs.org/docs/api-reference/metadata
 */
export const metadata: Metadata = {
  title: 'Next.js WordPress',
  description: "It's headless WordPress"
}

/**
 * The server-side root layout.
 *
 * @see https://beta.nextjs.org/docs/api-reference/file-conventions/layout
 */
export default function RootLayout({children}: ReactChildren) {
  return (
    <html lang="en">
      <head />
      <body className="blog">
        <Header description="WordPress Blog (Server)" />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
