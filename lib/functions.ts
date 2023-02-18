/**
 * Format the temperature in either Fahrenheit or Celsius.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 */
export function formatTemperature(tempUnit: string, temp: number): string {
  const temperature = tempUnit === "c" ? temp : temp * 1.8 + 32;

  return new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: tempUnit === "c" ? "celsius" : "fahrenheit",
  }).format(Math.round(temperature));
}

/**
 * Convert UNIX time into human readable format.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 */
export function formatTime(time: number): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(time);
}
