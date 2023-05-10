import config from '@/lib/config'
import Link from 'next/link'
import HeaderDescription from './HeaderDescription'

/**
 * The shared header component.
 */
export default function Header() {
  return (
    <header className="text-center sm:text-left">
      <h1>
        <Link href="/">{config.siteName}</Link>
      </h1>

      <nav className="flex flex-row gap-4">
        {config.nav.map((item, index) => (
          <Link
            className="text-base underline hover:no-underline"
            key={index}
            href={{pathname: item.path}}
            prefetch={false}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <HeaderDescription />
    </header>
  )
}
