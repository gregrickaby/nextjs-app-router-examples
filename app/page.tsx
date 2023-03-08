import config from '@/lib/config'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="column m-auto max-w-xl">
      <h1>{config?.siteName}</h1>

      <div className="flex flex-col gap-4">
        <h2>Choose your adventure:</h2>
        <nav className="flex items-center justify-center gap-4 text-center">
          <Link className="button" href="/wx-server/" prefetch={false}>
            Weather App (server)
          </Link>
          <Link className="button" href="/wx-client/" prefetch={false}>
            Weather App (client)
          </Link>
          <Link className="button" href="/blog/" prefetch={false}>
            WordPress Blog (server)
          </Link>
        </nav>
      </div>

      <h3>About</h3>
      <p>
        <strong>🔥 Server:</strong> Most component hydration and rendering
        happens on the server. Data fetching only occurs on the server. Then
        everything is streamed to your browser. This is new with React 18 and
        Next.js 13.
      </p>
      <p>
        <strong>👴 Client:</strong> Most components are rendered and hydrated
        after being parsed by your browser. Data fetching only happens in the
        browser. Data fetching requires a Next.js Route Handler. This attempts
        to mimic the experience of a traditional React/Next.js app.
      </p>
      <p>
        Weather data provided by{' '}
        <a className="underline" href="https://www.weatherapi.com/">
          weatherapi.com
        </a>
        . View the code{' '}
        <a className="underline" href={config.githubUrl}>
          on Github
        </a>
        . 🍻
      </p>
    </div>
  )
}
