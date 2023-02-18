import WeatherTable from "@/components/WeatherTable";
import { LocationPageProps, WeatherResponse } from "@/lib/types";
import { Metadata } from "next";
import { Suspense } from "react";

/**
 * Get the forecast for a location.
 *
 * Note: { cache: "no-store" } is required to enable dynamic rendering.
 *
 * @see https://beta.nextjs.org/docs/rendering/static-and-dynamic-rendering#using-dynamic-data-fetches
 *
 * @param string location The location to get the forecast for.
 */
async function getForecast(
  location: string
): Promise<{ weather: WeatherResponse; address: string }> {
  if (!location) {
    throw new Error("No location provided");
  }

  const geocodeResponse = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    { cache: "no-store" }
  );

  if (!geocodeResponse.ok) {
    throw new Error("Failed to fetch location coordinates");
  }

  const geocode = await geocodeResponse.json();
  const address = geocode?.results[0]?.formatted_address as string;
  const lat = geocode?.results[0]?.geometry?.location?.lat;
  const lng = geocode?.results[0]?.geometry?.location?.lng;

  const forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=imperial&exclude=minutely&appid=${process.env.OPENWEATHER_API_KEY}`,
    { cache: "no-store" }
  );

  if (!forecast.ok) {
    throw new Error("Failed to fetch weather forecast");
  }

  const weather = (await forecast.json()) as WeatherResponse;

  return {
    weather,
    address,
  };
}

/**
 * Generate dynamic metadadta.
 *
 * @see https://beta.nextjs.org/docs/guides/seo#dynamic-metadata
 */
export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  // Get the forecast for the location.
  const forecast = await getForecast(params.location);

  return {
    title: "Search Results",
    description: `The local forecast for ${forecast.address}`,
  };
}

/**
 * The location page.
 *
 * This page is a dynamic segment, so it will display the forecast
 * for any location provided in the URL.
 *
 * @usage /search/enterprise-al
 *
 * @see https://beta.nextjs.org/docs/routing/defining-routes#dynamic-segments
 */
export default async function Location({ params }: LocationPageProps) {
  // Get the forecast for the location.
  const forecast = await getForecast(params.location);

  return (
    <>
      <h1>Weather Search Results</h1>
      <Suspense fallback={<div>Loading weather forecast...</div>}>
        <h2>{forecast.address}</h2>
        <WeatherTable weather={forecast.weather} />
      </Suspense>
      <small>server component. node runtime. dynamic render.</small>
    </>
  );
}
