import config from '@/lib/config'

/**
 * The homepage.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */
export default function Homepage() {
  return (
    <article>
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
    </article>
  )
}
