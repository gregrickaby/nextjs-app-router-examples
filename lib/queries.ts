import {
  AllPostsResponse,
  GeocodeResponse,
  Post,
  PostResponse,
  Weather,
  WeatherResponse
} from '@/lib/types'

/**
 * Server-side function to fetch the weather forecast.
 *
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
 */
export async function getForecast(location: string): Promise<Weather | null> {
  try {
    // If no location is provided, throw an error.
    if (!location) {
      throw new Error('No location provided')
    }

    // Fetch the geolocation data.
    const geocodeResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
      {
        next: {
          revalidate: 86400 // Cache the geolocation response for 24 hours.
        }
      }
    )

    if (!geocodeResponse.ok) {
      throw new Error('Failed to fetch location coordinates')
    }

    const geocode = (await geocodeResponse.json()) as GeocodeResponse

    // Get the first address, latitude, and longitude.
    const address = geocode?.results[0]?.formatted_address
    const lat = geocode?.results[0]?.geometry?.location?.lat
    const lng = geocode?.results[0]?.geometry?.location?.lng

    if (!address || !lat || !lng) {
      throw new Error('Failed to fetch location coordinates')
    }

    // Fetch the weather forecast.
    const weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI_KEY}&q=${lat},${lng}`,
      {
        next: {
          revalidate: 300 // Cache the weather forecast response for 5 minutes.
        }
      }
    )

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather forecast')
    }

    const data = (await weatherResponse.json()) as WeatherResponse

    if (!data) {
      throw new Error('Weather forecast not found')
    }

    return {
      data,
      address
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Server-side function to fetch all blog posts.
 *
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
 */
export async function getAllPosts(): Promise<Post[] | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 3600 // Cache all posts response for 1 hour.
      },
      body: JSON.stringify({
        query: `
          query GetAllPosts {
            posts(where: {status: PUBLISH}) {
              edges {
                node {
                  commentCount
                  databaseId
                  title(format: RENDERED)
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
          }
      `
      })
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const {data} = (await response.json()) as AllPostsResponse

    if (!data) {
      throw new Error('Posts not found')
    }

    return data.posts.edges.map((post) => post.node)
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Server-side function to fetch a single blog post.
 *
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
 */
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 3600 // Cache the blog post response for 5 minutes.
      },
      body: JSON.stringify({
        query: `
          query GetPost($slug: ID!) {
            post(id: $slug, idType: SLUG) {
              title(format: RENDERED)
              databaseId
              date
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
                  name
                  avatar {
                    url
                  }
                }
              }
              tags {
                edges {
                  node {
                    databaseId
                    name
                  }
                }
              }
              categories {
                edges {
                  node {
                    databaseId
                    name
                  }
                }
              }
              seo {
                metaDesc
                title
              }
              content(format: RENDERED)
              comments(first: 50, where: {order: ASC, status: "APPROVE"}) {
                edges {
                  node {
                    databaseId
                    date
                    author {
                      node {
                        name
                        email
                        avatar {
                          url
                        }
                      }
                    }
                    content(format: RENDERED)
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

    const {data} = (await response.json()) as PostResponse

    if (data === null) {
      throw new Error('Post not found!')
    }

    return data.post
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Create a comment mutation.
 */
export async function createComment(comment: {
  name: string
  email: string
  website: string
  comment: string
  postID: number
}) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          mutation CREATE_COMMENT(
            $authorEmail: String!
            $authorName: String!
            $authorUrl: String
            $comment: String!
            $postID: Int!
          ) {
            createComment(
              input: {
                author: $authorName
                authorEmail: $authorEmail
                authorUrl: $authorUrl
                commentOn: $postID
                content: $comment
              }
            ) {
              success
              comment {
                author {
                  node {
                    avatar {
                      url
                    }
                    email
                    name
                    url
                  }
                }
                content(format: RENDERED)
                date
              }
            }
          }
      `,
        variables: {
          authorEmail: comment.email,
          authorName: comment.name,
          authorUrl: comment.website,
          comment: comment.comment,
          postID: comment.postID
        }
      })
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const status = await response.json()

    if (status.errors) {
      return {
        success: false,
        message: status.errors[0].message
      }
    }

    return {
      success: true,
      message: status.data
    }
  } catch (error) {
    console.error(error)
  }
}
