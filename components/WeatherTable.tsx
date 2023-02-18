import { WeatherResponse } from "@/lib/types";

export default function WeatherTable({
  weather,
}: {
  weather: WeatherResponse;
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Conditions</th>
          <th>Temp</th>
          <th>Wind</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{weather?.current?.weather[0]?.main}</td>
          <td>{weather?.current?.temp} F</td>
          <td>{weather?.current?.wind_speed} mph</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>
            <a href="https://openweathermap.org">Powered by OpenWeatherMap</a>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
