import WeatherTable from "@/components/WeatherTable";
import type { Metadata } from "next";
import { Suspense } from "react";

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
    `https://api.openweathermap.org/data/2.5/onecall?lat=31.3151708&lon=-85.85521609999999&units=imperial&exclude=minutely&appid=${process.env.OPENWEATHER_API_KEY}`
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
      <Suspense fallback={<div>Loading current conditions...</div>}>
        <WeatherTable weather={conditions} />
      </Suspense>
      <small>server component. edge runtime. streaming render.</small>
    </>
  );
}
