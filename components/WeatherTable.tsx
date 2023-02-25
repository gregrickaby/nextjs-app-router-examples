import { formatDate, formatTemp, getTempColor } from "@/lib/functions";
import { WeatherResponse } from "@/lib/types";
import styles from "./WeatherTable.module.css";

export default function WeatherTable({
  weather,
}: {
  weather: WeatherResponse;
}) {
  return (
    <section
      className={styles.container}
      style={
        {
          "--minTemp": getTempColor(weather.daily[0].temp.min),
          "--maxTemp": getTempColor(weather.daily[0].temp.max),
          "--currentTemp": getTempColor(weather.current.temp),
          "--feelsLikeTemp": getTempColor(weather.current.feels_like),
        } as React.CSSProperties
      }
    >
      <time className={styles.time}>
        {formatDate(weather?.current?.dt, weather?.timezone)}
      </time>

      <div className={styles.tempContainer}>
        <div className={styles.tempRange}>
          <span className={styles.minTemp}>
            {formatTemp(weather?.daily[0]?.temp?.min)}
          </span>
          -
          <span className={styles.maxTemp}>
            {formatTemp(weather?.daily[0]?.temp?.max)}
          </span>
        </div>
        <span className={styles.currentTemp}>
          {formatTemp(weather?.current?.temp)}
        </span>
        <span className={styles.feelsLikeTemp}>
          Feels Like {formatTemp(weather?.current?.feels_like)}
        </span>
      </div>
    </section>
  );
}
