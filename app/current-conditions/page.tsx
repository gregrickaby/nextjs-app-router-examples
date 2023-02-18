import { formatTime } from "@/lib/functions";
import type { Metadata } from "next";

export const runtime = "experimental-edge";
export const metadata: Metadata = {
  title: "Forecast",
  description: "The local forecast",
};

/**
 * Fetch the initial current conditions data.
 *
 * @see https://beta.nextjs.org/docs/data-fetching/fetching
 *
 * Note: This fetch happens on the server.
 */
async function getCurrentConditions() {
  const response = await fetch(
    `https://api.open-meteo.com/v1/gfs?latitude=31.32&longitude=-85.86&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&forecast_days=1&timezone=America%2FChicago`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

/**
 * The Current Conditions page.
 *
 * @see https://beta.nextjs.org/docs/routing/pages-and-layouts
 */
export default async function CurrentConditions() {
  const conditions = await getCurrentConditions();

  return (
    <>
      <h1>Current Conditions</h1>
      <p>Enterprise, Alabama, USA</p>
      <table>
        <thead>
          <tr>
            <th>Temp</th>
            <th>Wind</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{conditions.current_weather.temperature}F</td>
            <td>{conditions.current_weather.windspeed}mph</td>
            <td>{formatTime(Date.parse(conditions.current_weather.time))}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <a href="https://open-meteo.com">Powered by Open-Meteo</a>
            </td>
          </tr>
        </tfoot>
      </table>
      <small>server component. edge runtime. streaming render.</small>
    </>
  );
}
