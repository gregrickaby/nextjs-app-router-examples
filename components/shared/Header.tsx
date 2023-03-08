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
      <nav>
        {config.nav.map((item, index) => (
          <Link
            className="mx-2 text-base underline hover:no-underline"
            key={index}
            href={item.path}
            prefetch={false}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  )
}
