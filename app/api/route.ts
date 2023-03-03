import { getForecast } from "@/lib/functions";
import { NextResponse } from "next/server";

/**
 * Weather API route.
 *
 * @usage https://example.com/api/?location=Enterprise,AL
 *
 * @see https://beta.nextjs.org/docs/routing/route-handlers
 */
export async function GET(request: Request) {
  // Get the the query string from the request URL.
  const { searchParams } = new URL(request.url);

  // Get the location from the query string or default to Enterprise, AL.
  const location = searchParams.get("location") || "Enterprise, AL";

  // Get the weather forecast for the location.
  const { weather } = await getForecast(location);

  // Return the weather forecast as JSON.
  return NextResponse.json(weather);
}
