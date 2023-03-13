export interface GeocodeResponse {
  status: string
  results: [
    {
      geometry: {
        location: {
          lat: number
          lng: number
        }
      }
    }
  ]
}

export interface WeatherResponse {
  [key: string]: any
}

export interface ColorRange {
  minTemp: number
  maxTemp: number
  color: string
}

export interface PredictionResponse {
  description: string
}

export interface Place {
  predictions: PredictionResponse[]
  status: string
}

export interface LocationPageProps {
  params: {location: string}
}

export interface ReactChildren {
  children: React.ReactNode
}

export interface ServerWeatherContextProps {
  location: string
  setLocation: (location: string) => void
  setUnit: (unit: 'metric' | 'imperial') => void
  unit: string
}

export interface ClientWeatherContextProps {
  location: string
  setLocation: (location: string) => void
  setUnit: (unit: 'metric' | 'imperial') => void
  unit: string
  weather: WeatherResponse
  setWeather: (weather: WeatherResponse) => void
}

export interface Post {
  author: {
    node: {
      gravatarUrl: string
      name: string
    }
  }
  databaseId: string
  date: string
  slug: string
  title: string
  excerpt: string
  content: string
  commentCount: number
  categories: {
    nodes: [
      {
        databaseId: string
        name: string
      }
    ]
  }
  tags: {
    nodes: [
      {
        databaseId: string
        name: string
      }
    ]
  }
  featuredImage: {
    node: {
      altText: string
      mediaDetails: {
        sizes: [
          {
            name: string
            sourceUrl: string
            height: number
            width: number
          }
        ]
      }
    }
  }
  seo: {
    metaDesc: string
    title: string
  }
  comments: {
    nodes: [
      {
        databaseId: string
        content: string
        date: string
        status: string
        author: {
          node: {
            email: string
            gravatarUrl: string
            name: string
          }
        }
      }
    ]
  }
}

export interface AllPosts {
  posts: {
    nodes: Post[]
  }
}
