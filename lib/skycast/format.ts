/** All three helpers take a raw UTC unix timestamp + a city's timezone
 *  offset (seconds) and format it in *that city's* local time, regardless
 *  of the viewer's own timezone — same trick SkyCast used server-side. */

export function formatLocalHour(dt: number, timezoneOffset: number) {
  const local = new Date((dt + timezoneOffset) * 1000);
  return local.toLocaleTimeString("en-US", { hour: "numeric", timeZone: "UTC" });
}

export function formatLocalClock(unixSeconds: number, timezoneOffset: number) {
  const local = new Date((unixSeconds + timezoneOffset) * 1000);
  return local.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
}

export function formatLocalDay(dt: number, timezoneOffset: number) {
  const local = new Date((dt + timezoneOffset) * 1000);
  return local.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
}
