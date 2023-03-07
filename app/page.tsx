import config from '@/lib/config'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="column m-auto max-w-xl">
      <h1>{config?.siteName}</h1>

      <div className="flex items-center gap-2">
        <h2>Choose your adventure:</h2>
        <nav>
          <Link className="button" href="/server/" prefetch={false}>
            Server
          </Link>{' '}
          or{' '}
          <Link className="button" href="/client/" prefetch={false}>
            Client
          </Link>
          or <Link href="/blog/">Blog</Link>
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
      <em>
        *Both versions use a mix of Server and Client Components as well as
        React Context.
      </em>
      <p>
        Weather data provided by{' '}
        <a className="underline" href="https://www.weatherapi.com/">
          weatherapi.com
        </a>
        . View the code{' '}
        <a
          className="underline"
          href="https://github.com/gregrickaby/nextjs-app-directory"
        >
          on Github
        </a>
        . 🍻
      </p>
    </div>
  )
}
