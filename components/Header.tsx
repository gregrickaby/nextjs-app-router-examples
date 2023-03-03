import config from '@/lib/config'
import Link from 'next/link'

/**
 * The Header component.
 */
export default function Header() {
  return (
    <header className="header">
      <h1>
        <Link href="/">{config.siteName}</Link>
      </h1>
      <p>{config.siteDescription}</p>
    </header>
  )
}
