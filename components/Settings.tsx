'use client'

import {useWeatherContext} from './WeatherProvider'

/**
 * The settings component.
 */
export default function Settings() {
  const {unit, setUnit} = useWeatherContext()

  return (
    <div className="settings">
      <button
        onClick={() => setUnit(unit === 'imperial' ? 'metric' : 'imperial')}
      >
        {unit === 'imperial' ? '°F' : '°C'}
      </button>
    </div>
  )
}
