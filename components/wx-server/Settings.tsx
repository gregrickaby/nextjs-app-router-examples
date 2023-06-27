'use client'

import {useWeatherContext} from '@/components/wx-server/WeatherProvider'

/**
 * The settings component.
 */
export default function Settings() {
  const {unit, setUnit} = useWeatherContext()

  return (
    <div className="absolute right-0 top-0">
      <button
        onClick={() => setUnit(unit === 'imperial' ? 'metric' : 'imperial')}
      >
        {unit === 'imperial' ? '°F' : '°C'}
      </button>
    </div>
  )
}
