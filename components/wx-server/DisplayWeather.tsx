'use client'

import {useWeatherContext} from '@/components/wx-server/WeatherProvider'
import {
  formatDate,
  formatDistance,
  formatSpeed,
  formatTemp,
  getTempColor
} from '@/lib/functions'
import {WeatherResponse} from '@/lib/types'

/**
 * The display weather component.
 */
export default function DisplayServerWeather({
  weather
}: {
  weather: WeatherResponse
}) {
  const {unit} = useWeatherContext()

  // If there is no weather data, return null.
  if (!weather.location) return null

  // Desctructure the weather object.
  const {current, forecast, location} = weather
  const {forecastday} = forecast
  const {name, region, localtime_epoch, tz_id} = location
  const {
    temp_f,
    condition: {text},
    wind_mph,
    wind_dir,
    pressure_in,
    humidity,
    feelslike_f,
    vis_miles,
    uv
  } = current

  return (
    <section
      className="weather not-prose"
      style={
        {
          '--angle': '0deg',
          '--minTemp': getTempColor(forecastday[0]?.day?.mintemp_f),
          '--maxTemp': getTempColor(forecastday[0]?.day?.maxtemp_f),
          '--currentTemp': getTempColor(temp_f),
          '--feelsLikeTemp': getTempColor(feelslike_f)
        } as React.CSSProperties
      }
    >
      <h1>Current Conditions</h1>
      <time className="time">{formatDate(localtime_epoch, tz_id)}</time>

      <div className="row">
        <div className="column">
          <div className="temp-box">
            <div className="temp-range">
              <span>{formatTemp(forecastday[0]?.day?.mintemp_f, unit)}</span>-
              <span>{formatTemp(forecastday[0]?.day?.maxtemp_f, unit)}</span>
            </div>
            <span className="current-temp">{formatTemp(temp_f, unit)}</span>
            <span>Feels Like {formatTemp(feelslike_f, unit)}</span>
          </div>
        </div>

        <div className="column">
          <div className="weather-table">
            <div className="column" style={{textAlign: 'right'}}>
              <p>Location</p>
              <p>Sky</p>
              <p>Wind</p>
              <p>Pressure</p>
              <p>Humidity</p>
              <p>Visibility</p>
              <p>UV Index</p>
              <p>Sunrise</p>
              <p>Sunset</p>
              <p>Moon Phase</p>
            </div>

            <div className="column">
              <p>
                {name}, {region}
              </p>
              <p>{text}</p>
              <p>
                {formatSpeed(wind_mph, unit)} {wind_dir}
              </p>
              <p>{pressure_in} inHg</p>
              <p>{humidity}%</p>
              <p>{formatDistance(vis_miles, unit)}</p>
              <p>{uv}</p>
              <p>{forecastday[0]?.astro?.sunrise}</p>
              <p>{forecastday[0]?.astro?.sunset}</p>
              <p>{forecastday[0]?.astro?.moon_phase}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
