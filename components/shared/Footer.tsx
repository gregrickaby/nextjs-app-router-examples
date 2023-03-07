import config from '@/lib/config'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <nav>
        {config.nav.map((item, index) => (
          <Link className="mx-2" key={index} href={item.path} prefetch={false}>
            {item.name}
          </Link>
        ))}
      </nav>
      <p>{config.siteCredits}</p>
    </footer>
  )
}
