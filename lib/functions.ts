import { ColorRange } from "./types";

/**
 * Convert UNIX time into human readable format.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 */
export function formatDate(time: number, timezone: string): string {
  const date = new Date(time * 1000);
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: timezone,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

/**
 * Convert the temperature from Celsius to Fahrenheit.
 */
export function celsiusToFahrenheit(celsius: number) {
  return celsius * 1.8 + 32;
}

/**
 * Convert the temperature from Fahrenheit to Celsius.
 */
export function fahrenheitToCelsius(fahrenheit: number) {
  return (fahrenheit - 32) / 1.8;
}

/**
 * Format the temperature in either Fahrenheit or Celsius.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 */
export function formatTemp(temp: number, tempUnit = "f"): string {
  const temperature = tempUnit === "c" ? fahrenheitToCelsius(temp) : temp;
  const unit = tempUnit === "c" ? "celsius" : "fahrenheit";

  return new Intl.NumberFormat("en-US", { style: "unit", unit }).format(
    Math.round(temperature)
  );
}

/**
 * Get the color for the temperature.
 */
export function getTempColor(temp: number): string {
  const temperature = Math.min(temp, 105);
  const colorRange = colorRanges.find(
    (range) => temperature >= range.minTemp && temperature < range.maxTemp
  );

  return colorRange?.color ?? "rgb(255, 255, 255)";
}

/**
 * Convert Fahrenheit into an RGB color.
 */
const colorRanges: ColorRange[] = [
  { minTemp: -100, maxTemp: -20, color: "rgb(55, 0, 55)" },
  { minTemp: -20, maxTemp: -15, color: "rgb(88, 0, 88)" },
  { minTemp: -15, maxTemp: -10, color: "rgb(144, 0, 144)" },
  { minTemp: -10, maxTemp: -5, color: "rgb(192, 0, 192)" },
  { minTemp: -5, maxTemp: 0, color: "rgb(240, 0, 240)" },
  { minTemp: 0, maxTemp: 5, color: "rgb(176, 0, 240)" },
  { minTemp: 5, maxTemp: 10, color: "rgb(94, 0, 240)" },
  { minTemp: 10, maxTemp: 15, color: "rgb(0, 0, 240)" },
  { minTemp: 15, maxTemp: 20, color: "rgb(0, 84, 240)" },
  { minTemp: 20, maxTemp: 25, color: "rgb(0, 132, 240)" },
  { minTemp: 25, maxTemp: 30, color: "rgb(0, 184, 240)" },
  { minTemp: 30, maxTemp: 35, color: "rgb(0, 248, 240)" },
  { minTemp: 35, maxTemp: 40, color: "rgb(0, 224, 192)" },
  { minTemp: 40, maxTemp: 45, color: "rgb(0, 196, 112)" },
  { minTemp: 45, maxTemp: 50, color: "rgb(0, 172, 0)" },
  { minTemp: 50, maxTemp: 55, color: "rgb(112, 196, 0)" },
  { minTemp: 55, maxTemp: 60, color: "rgb(192, 224, 0)" },
  { minTemp: 60, maxTemp: 65, color: "rgb(240, 248, 0)" },
  { minTemp: 65, maxTemp: 70, color: "rgb(240, 196, 0)" },
  { minTemp: 70, maxTemp: 75, color: "rgb(240, 148, 0)" },
  { minTemp: 75, maxTemp: 80, color: "rgb(240, 96, 0)" },
  { minTemp: 80, maxTemp: 85, color: "rgb(240, 0, 0)" },
  { minTemp: 85, maxTemp: 90, color: "rgb(192, 0, 0)" },
  { minTemp: 90, maxTemp: 95, color: "rgb(144, 0, 0)" },
  { minTemp: 95, maxTemp: 100, color: "rgb(88, 0, 0)" },
  { minTemp: 100, maxTemp: 150, color: "rgb(255, 255, 255)" },
].sort((a, b) => a.minTemp - b.minTemp);

/**
 * Get direction from degrees.
 */
export function getDirection(degrees: number): string {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}
