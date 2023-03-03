import config from '@/lib/config'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <p>{config.siteCredits}</p>
      <nav>
        <Link href="/">Home</Link> |{' '}
        <Link href="/server/">Server Components</Link>
      </nav>
      <p className="text-red-300">Client Components</p>
    </footer>
  )
}
