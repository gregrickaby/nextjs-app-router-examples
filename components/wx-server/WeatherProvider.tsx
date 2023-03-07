'use client'

import {ReactChildren, ServerWeatherContextProps} from '@/lib/types'
import {createContext, useContext, useState} from 'react'

// Create the context.
const WeatherContext = createContext({} as ServerWeatherContextProps)

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

  return (
    <WeatherContext.Provider
      value={{
        location,
        setLocation,
        unit,
        setUnit
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}
