import config from '@/lib/config'

export default function Footer() {
  return (
    <footer className="footer">
      <p>{config.siteCredits}</p>
    </footer>
  )
}
