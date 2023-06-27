import {AllPosts, ColorRange, Post, WeatherResponse} from './types'
import {cache} from 'react'

/**
 * Convert UNIX time into human readable format.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 */
export function formatDate(time: number, timezone: string): string {
  const date = new Date(time * 1000)
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: timezone
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

/**
 * Convert the temperature from Fahrenheit to Celsius.
 */
export function fahrenheitToCelsius(fahrenheit: number) {
  return (fahrenheit - 32) / 1.8
}

/**
 * Format the speed in either miles per hour or kilometers per hour.
 */
export function formatSpeed(speed: number, unit: string): string {
  const speedFormat = unit === 'imperial' ? speed : speed * 1.609344
  return new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: unit === 'imperial' ? 'mile-per-hour' : 'kilometer-per-hour'
  }).format(Math.round(speedFormat))
}

/**
 * Format the distance in either miles or kilometers.
 */
export function formatDistance(distance: number, unit: string): string {
  const distanceFormat = unit === 'imperial' ? distance : distance * 1.609344
  return new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: unit === 'imperial' ? 'mile' : 'kilometer'
  }).format(Math.round(distanceFormat))
}

/**
 * Format the temperature in either Fahrenheit or Celsius.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 */
export function formatTemp(temp: number, unit: string): string {
  const temperature = unit === 'imperial' ? temp : fahrenheitToCelsius(temp)

  return new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: unit === 'imperial' ? 'fahrenheit' : 'celsius'
  }).format(Math.round(temperature))
}

/**
 * Get the color for the temperature.
 */
export function getTempColor(temp: number): string {
  const temperature = Math.min(temp, 105)
  const colorRange = colorRanges.find(
    (range) => temperature >= range.minTemp && temperature < range.maxTemp
  )

  return colorRange?.color ?? 'rgb(255, 255, 255)'
}
/**
 * Convert Fahrenheit into an RGB color.
 */
const colorRanges: ColorRange[] = [
  {minTemp: -100, maxTemp: -20, color: 'rgb(55, 0, 55)'},
  {minTemp: -20, maxTemp: -15, color: 'rgb(88, 0, 88)'},
  {minTemp: -15, maxTemp: -10, color: 'rgb(144, 0, 144)'},
  {minTemp: -10, maxTemp: -5, color: 'rgb(192, 0, 192)'},
  {minTemp: -5, maxTemp: 0, color: 'rgb(240, 0, 240)'},
  {minTemp: 0, maxTemp: 5, color: 'rgb(176, 0, 240)'},
  {minTemp: 5, maxTemp: 10, color: 'rgb(94, 0, 240)'},
  {minTemp: 10, maxTemp: 15, color: 'rgb(0, 0, 240)'},
  {minTemp: 15, maxTemp: 20, color: 'rgb(0, 84, 240)'},
  {minTemp: 20, maxTemp: 25, color: 'rgb(0, 132, 240)'},
  {minTemp: 25, maxTemp: 30, color: 'rgb(0, 184, 240)'},
  {minTemp: 30, maxTemp: 35, color: 'rgb(0, 248, 240)'},
  {minTemp: 35, maxTemp: 40, color: 'rgb(0, 224, 192)'},
  {minTemp: 40, maxTemp: 45, color: 'rgb(0, 196, 112)'},
  {minTemp: 45, maxTemp: 50, color: 'rgb(0, 172, 0)'},
  {minTemp: 50, maxTemp: 55, color: 'rgb(112, 196, 0)'},
  {minTemp: 55, maxTemp: 60, color: 'rgb(192, 224, 0)'},
  {minTemp: 60, maxTemp: 65, color: 'rgb(240, 248, 0)'},
  {minTemp: 65, maxTemp: 70, color: 'rgb(240, 196, 0)'},
  {minTemp: 70, maxTemp: 75, color: 'rgb(240, 148, 0)'},
  {minTemp: 75, maxTemp: 80, color: 'rgb(240, 96, 0)'},
  {minTemp: 80, maxTemp: 85, color: 'rgb(240, 0, 0)'},
  {minTemp: 85, maxTemp: 90, color: 'rgb(192, 0, 0)'},
  {minTemp: 90, maxTemp: 95, color: 'rgb(144, 0, 0)'},
  {minTemp: 95, maxTemp: 100, color: 'rgb(88, 0, 0)'},
  {minTemp: 100, maxTemp: 150, color: 'rgb(255, 255, 255)'}
].sort((a, b) => a.minTemp - b.minTemp)

/**
 * Server-side function to fetch the weather forecast.
 *
 * Note: { cache: "no-store" } is required to enable dynamic rendering!
 *
 * @see https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#using-dynamic-data-fetches
 */
export async function getForecast(
  location: string
): Promise<{weather: WeatherResponse; address: string}> {
  if (!location) {
    throw new Error('No location provided')
  }

  const geocodeResponse = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    {cache: 'no-store'}
  )

  if (!geocodeResponse.ok) {
    throw new Error('Failed to fetch location coordinates')
  }

  const geocode = await geocodeResponse.json()
  const address = geocode?.results[0]?.formatted_address as string
  const lat = geocode?.results[0]?.geometry?.location?.lat
  const lng = geocode?.results[0]?.geometry?.location?.lng

  const forecast = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI_KEY}&q=${lat},${lng}`,
    {cache: 'no-store'}
  )

  if (!forecast.ok) {
    throw new Error('Failed to fetch weather forecast')
  }

  const weather = (await forecast.json()) as WeatherResponse

  return {
    weather,
    address
  }
}

/**
 * Server-side function to fetch a single blog post.
 *
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/caching#graphql-and-cache
 */
export const getAllPosts = cache(async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query GetAllPosts {
            posts {
              nodes {
                commentCount
                databaseId
                title
                slug
                excerpt(format: RENDERED)
                featuredImage {
                  node {
                    altText
                    mediaDetails {
                      sizes(include: MEDIUM) {
                        height
                        width
                        sourceUrl
                      }
                    }
                  }
                }
              }
            }
          }
      `
      })
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const posts = await response.json()

    if (posts === null) {
      throw new Error('Post not found')
    }

    return posts.data.posts.nodes as Post[]
  } catch (error) {
    console.error(error)
  }
})

/**
 * Server-side function to fetch a single blog post.
 *
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/caching#graphql-and-cache
 */
export const getPost = cache(async (slug: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query GetPost($slug: ID!) {
            post(id: $slug, idType: SLUG) {
              databaseId
              content(format: RENDERED)
              title(format: RENDERED)
              featuredImage {
                node {
                  altText
                  mediaDetails {
                    sizes(include: MEDIUM) {
                      height
                      width
                      sourceUrl
                    }
                  }
                }
              }
              author {
                node {
                  gravatarUrl
                  name
                }
              }
              date
              tags {
                nodes {
                  databaseId
                  name
                }
              }
              categories {
                nodes {
                  databaseId
                  name
                }
              }
              seo {
                metaDesc
                title
              }
              comments(first: 10, where: {order: ASC}) {
                nodes {
                  content(format: RENDERED)
                  databaseId
                  date
                  status
                  author {
                    node {
                      email
                      gravatarUrl
                      name
                    }
                  }
                }
              }
            }
          }
      `,
        variables: {
          slug: slug
        }
      })
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const post = await response.json()

    if (post === null) {
      throw new Error('Post not found!')
    }

    return post.data.post as Post
  } catch (error) {
    console.error(error)
  }
})
