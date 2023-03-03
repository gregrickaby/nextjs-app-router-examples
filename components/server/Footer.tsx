import config from '@/lib/config'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <p>{config.siteCredits}</p>
      <nav>
        <Link href="/">Home</Link> |{' '}
        <Link href="/client/">Client Components</Link>
      </nav>
      <p className="text-red-300">Server Components</p>
    </footer>
  )
}
