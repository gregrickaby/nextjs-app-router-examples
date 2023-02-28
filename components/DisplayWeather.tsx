"use client";

import {
  formatDate,
  formatSpeed,
  formatTemp,
  getDirection,
  getTempColor,
} from "@/lib/functions";
import { WeatherResponse } from "@/lib/types";
import { useWeatherContext } from "./WeatherProvider";

/**
 * The display weather component.
 */
export default function DisplayWeather({
  weather,
}: {
  weather: WeatherResponse;
}) {
  const { unit } = useWeatherContext();

  return (
    <section
      className="weatherContainer"
      style={
        {
          "--minTemp": getTempColor(weather?.daily[0]?.temp?.min),
          "--maxTemp": getTempColor(weather?.daily[0]?.temp?.max),
          "--currentTemp": getTempColor(weather?.current?.temp),
          "--feelsLikeTemp": getTempColor(weather?.current?.feels_like),
        } as React.CSSProperties
      }
    >
      <time className="time">
        {formatDate(weather?.current?.dt, weather?.timezone)}
      </time>

      <div className="row">
        <div className="tempContainer">
          <div className="tempRange">
            <span>{formatTemp(weather?.daily[0]?.temp?.min, unit)}</span>-
            <span>{formatTemp(weather?.daily[0]?.temp?.max, unit)}</span>
          </div>
          <span className="currentTemp">
            {formatTemp(weather?.current?.temp, unit)}
          </span>
          <span>
            Feels Like {formatTemp(weather?.current?.feels_like, unit)}
          </span>
        </div>

        <div className="row">
          <div className="column" style={{ textAlign: "right" }}>
            <p>Sky</p>
            <p>Wind</p>
            <p>Pressure</p>
            <p>Humidity</p>
            <p>Dew Point</p>
            <p>UV Index</p>
          </div>

          <div className="column">
            <p>{weather?.current?.weather[0]?.main}</p>
            <p>
              {formatSpeed(weather?.current?.wind_speed, unit)}{" "}
              {getDirection(weather?.current?.wind_deg)}
            </p>
            <p>{weather?.current?.pressure} hPa</p>
            <p>{weather?.current?.humidity}%</p>
            <p>{formatTemp(weather?.current?.dew_point, unit)}</p>
            <p>{weather?.current?.uvi}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
