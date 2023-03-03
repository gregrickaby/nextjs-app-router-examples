import Link from 'next/link'

export default function Page() {
  return (
    <div className="row items-center justify-center">
      <h1>Choose your adventure...</h1>
      <nav>
        <Link className="button" href="/server/" prefetch={false}>
          Server Components
        </Link>{' '}
        <Link className="button" href="/client/" prefetch={false}>
          Client Components
        </Link>
      </nav>
    </div>
  )
}
