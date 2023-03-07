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
  id: string
  slug: string
  title: {rendered: string}
  excerpt: {rendered: string}
}

export interface AllPosts {
  [key: string]: Post
}
