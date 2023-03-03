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

export interface WeatherContextProps {
  location: string
  setLocation: (location: string) => void
  setUnit: (unit: 'metric' | 'imperial') => void
  unit: string
}
