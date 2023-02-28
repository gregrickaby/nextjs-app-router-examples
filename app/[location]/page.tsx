import DisplayWeather from "@/components/DisplayWeather";
import { getForecast } from "@/lib/functions";
import { LocationPageProps } from "@/lib/types";
import { Metadata } from "next";

export const runtime = "experimental-edge";

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
    title: {
      default: "Weather Search Results",
      template: "%s - Next.js App Directory Sandbox",
    },
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
  const { weather } = await getForecast(params.location);

  return (
    <>
      <h1>Weather Conditions</h1>
      <DisplayWeather weather={weather} />
    </>
  );
}
