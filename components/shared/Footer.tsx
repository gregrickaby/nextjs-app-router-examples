import config from '@/lib/config'
import Link from 'next/link'

/**
 * The shared footer component.
 */
export default function Footer() {
  return (
    <footer className="text-center text-sm">
      <nav className="flex flex-row justify-center gap-4">
        {config.nav.map((item, index) => (
          <Link
            className="underline hover:no-underline"
            href={{pathname: item.path}}
            key={index}
            prefetch={false}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <p>{config.siteCredits}</p>
    </footer>
  )
}
