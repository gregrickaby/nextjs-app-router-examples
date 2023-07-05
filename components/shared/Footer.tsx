import config from '@/lib/config'

/**
 * The shared footer component.
 */
export default function Footer() {
  return (
    <footer className="text-center text-sm">
      <p>
        Created by <a href={config.authorUrl}>{config.author}</a>
      </p>
    </footer>
  )
}
