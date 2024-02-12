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
  title: string
  databaseId: number
  date: string
  slug: string
  commentCount: number
  featuredImage: {
    node: {
      altText: string
      mediaDetails: {
        sizes: {
          height: number
          width: number
          sourceUrl: string
        }[]
      }
    }
  }
  author: {
    node: {
      name: string
      avatar: {
        url: string
      }
    }
  }
  tags: {
    edges: {
      node: {
        databaseId: number
        name: string
      }
    }[]
  }
  categories: {
    edges: {
      node: {
        databaseId: number
        name: string
      }
    }[]
  }
  seo: {
    metaDesc: string
    title: string
  }
  excerpt: string
  content: string
  comments: {
    edges: {
      node: {
        databaseId: number
        date: string
        author: {
          node: {
            email: string
            name: string
            avatar: {
              url: string
            }
          }
        }
        content: string
      }
    }[]
  }
}

export interface PostResponse {
  data: {
    post: Post
  }
}

export interface AllPostsResponse {
  data: {
    posts: {
      edges: {
        node: Post
      }[]
    }
  }
}

export interface GeocodeResponse {
  status: string
  results: {
    address_components: {
      long_name: string
      short_name: string
      types: string[]
    }[]
    formatted_address: string
    geometry: {
      bounds: {
        northeast: {
          lat: number
          lng: number
        }
        southwest: {
          lat: number
          lng: number
        }
      }
      location: {
        lat: number
        lng: number
      }
      location_type: string
      viewport: {
        northeast: {
          lat: number
          lng: number
        }
        southwest: {
          lat: number
          lng: number
        }
      }
      place_id: string
      types: string[]
    }
  }[]
}

export interface WeatherResponse {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
  }
  current: {
    last_updated_epoch: number
    last_updated: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: Condition
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    vis_km: number
    vis_miles: number
    uv: number
    gust_mph: number
    gust_kph: number
  }
  forecast: {
    forecastday: ForecastDay[]
  }
}

export interface Weather {
  data: WeatherResponse
  address: string
}
