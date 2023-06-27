import {GeocodeResponse, WeatherResponse} from '@/lib/types'

export const runtime = 'edge'

/**
 * The weather (client) API route handler.
 *
 * @usage https://example.com/api/?location=Enterprise,AL
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
 */
export async function GET(request: Request) {
  // Get query params from request.
  const {searchParams} = new URL(request.url)

  // Parse params.
  const unsanitizedLocation = searchParams.get('location') || ''

  // Sanitize the location.
  const location = encodeURI(unsanitizedLocation)

  // No location? Bail...
  if (!location) {
    return new Response(JSON.stringify({error: 'No location provided.'}), {
      status: 400,
      statusText: 'Bad Request'
    })
  }

  // Set default coordinates as fallback.
  let lat = 28.3886186
  let lng = -81.5659069

  try {
    // First, try to geocode the address.
    const geocode = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    )

    // Issue with the geocode request? Bail...
    if (geocode.status !== 200) {
      return new Response(
        JSON.stringify({
          error: `${geocode.statusText}`
        }),
        {
          status: geocode.status,
          statusText: geocode.statusText
        }
      )
    }

    // Parse the response.
    const coordinates = (await geocode.json()) as GeocodeResponse

    // Issue with the response? Bail...
    if (coordinates.status != 'OK' || !coordinates.results.length) {
      return new Response(
        JSON.stringify({
          error: `${coordinates.status}`
        }),
        {
          status: 400,
          statusText: 'Bad Request'
        }
      )
    }

    // Pluck out and set the coordinates.
    lat = coordinates?.results[0]?.geometry?.location?.lat
    lng = coordinates?.results[0]?.geometry?.location?.lng
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({error: `${error}`}), {
      status: 500,
      statusText: 'Internal Server Error'
    })
  }

  try {
    // Now, fetch the weather data.
    const weather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI_KEY}&q=${lat},${lng}`
    )

    // Issue with the weather response? Bail...
    if (weather.status != 200) {
      return new Response(
        JSON.stringify({
          error: `${weather.statusText}`
        }),
        {
          status: weather.status,
          statusText: weather.statusText
        }
      )
    }

    // Parse the response.
    const forecast = (await weather.json()) as WeatherResponse

    // Issue with the forecast? Bail...
    if (!forecast.location) {
      return new Response(
        JSON.stringify({
          error: 'No forecast data.'
        }),
        {
          status: 400,
          statusText: 'Bad Request'
        }
      )
    }

    // Return the weather data.
    return new Response(JSON.stringify(forecast), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=300, stale-while-revalidate'
      },
      status: 200,
      statusText: 'OK'
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({error: `${error}`}), {
      status: 500,
      statusText: 'Internal Server Error'
    })
  }
}
