import WeatherTable from "@/components/DisplayWeather";
import config from "@/lib/config";
import { getForecast } from "@/lib/functions";
import type { Metadata } from "next";

export const runtime = "experimental-edge";
export const metadata: Metadata = {
  title: config.siteName,
  description: config.siteDescription,
};

/**
 * The Homepage.
 *
 * @see https://beta.nextjs.org/docs/routing/pages-and-layouts
 */
export default async function Homepage() {
  const { weather } = await getForecast("Enterprise, AL");

  return (
    <>
      <h1>Weather Conditions</h1>
      <WeatherTable weather={weather} />
    </>
  );
}
