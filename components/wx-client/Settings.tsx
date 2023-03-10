'use client'

import {useWeatherContext} from '@/components/wx-client/WeatherProvider'

/**
 * The settings component.
 */
export default function Settings() {
  const {unit, setUnit} = useWeatherContext()

  return (
    <div className="absolute top-0 right-0">
      <button
        onClick={() => setUnit(unit === 'imperial' ? 'metric' : 'imperial')}
      >
        {unit === 'imperial' ? '°F' : '°C'}
      </button>
    </div>
  )
}
