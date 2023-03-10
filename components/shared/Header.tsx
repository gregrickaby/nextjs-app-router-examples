import config from '@/lib/config'
import Link from 'next/link'

/**
 * The shared header component.
 */
export default function Header({description}: {description: string}) {
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
            href={item.path}
            prefetch={false}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <h2>{description}</h2>
    </header>
  )
}
