/**
 * Loading component.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states
 */
export default function Loading() {
  return (
    <div className="grid h-full w-full place-items-center">
      <svg viewBox="0 0 100 100" className="h-24 w-24 animate-spin">
        <path
          fill="#fff"
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        />
      </svg>
    </div>
  )
}
