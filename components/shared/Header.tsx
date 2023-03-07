import config from '@/lib/config'
import Link from 'next/link'

/**
 * The Header component.
 */
export default function Header({description}: {description: string}) {
  return (
    <header className="header">
      <h1>
        <Link href="/">{config.siteName}</Link>
      </h1>
      <p>{description}</p>
    </header>
  )
}
