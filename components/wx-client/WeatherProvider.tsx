'use client'

import {ClientWeatherContextProps, ReactChildren} from '@/lib/types'
import {createContext, useContext, useEffect, useState} from 'react'

// Create the context.
const WeatherContext = createContext({} as ClientWeatherContextProps)

// Create a custom hook to use the context.
export function useWeatherContext() {
  return useContext(WeatherContext)
}

/**
 * The WeatherProvider component.
 */
export default function WeatherProvider({children}: ReactChildren) {
  const [location, setLocation] = useState('Enterprise, AL')
  const [unit, setUnit] = useState('imperial')
  const [weather, setWeather] = useState({})

  // Fetch the weather data on mount.
  useEffect(() => {
    async function searchWeather() {
      try {
        const response = await fetch(`/api/weather?location=${location}`)
        const data = await response.json()
        setWeather(data)
      } catch (error) {
        console.error(error)
      }
    }

    searchWeather()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WeatherContext.Provider
      value={{
        location,
        setLocation,
        unit,
        setUnit,
        weather,
        setWeather
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}
