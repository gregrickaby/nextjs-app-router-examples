import { getForecast } from "@/lib/functions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location") || "Enterprise, AL";
  const { weather } = await getForecast(location);

  return Response.json(weather);
}
