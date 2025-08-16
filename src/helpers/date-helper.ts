import { parse } from "date-fns";
import { toZonedTime, formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { logger } from "../application/logging";

const DEFAULT_TIMEZONE = process.env.DEFAULT_TIMEZONE || "Asia/Jakarta";

/**
 * Convert date string (e.g. "2025-01-01 10:10:10") to Date object
 * ubah menjadi format date dari string
 */
export function stringToDate(
  dateStr: string,
  format: string = "yyyy-MM-dd HH:mm:ss",
  timeZone: string = DEFAULT_TIMEZONE
): Date {
  const parsedDate = parse(dateStr, format, new Date());
  // konversi ke utc sesuai timezone sistem, tersimpan ke db tetap pakai utc
  return fromZonedTime(parsedDate, timeZone);
}

/**
 * Convert Date object to string "YYYY-MM-DD HH:MM:SS"
 *
 */
export function dateToString(
  date: Date,
  timeZone: string = DEFAULT_TIMEZONE
): string {
  return formatInTimeZone(date, timeZone, "yyyy-MM-dd HH:mm:ss");
}

/**
 * Format date string to another format
 * e.g. formatDateString("2025-01-01 10:10:10", "dd/MM/yyyy") => "01/01/2025"
 */
export function formatDateString(
  dateStr: string,
  outputFormat: string,
  timeZone: string = DEFAULT_TIMEZONE
): string {
  const date = stringToDate(dateStr);
  return formatInTimeZone(date, timeZone, outputFormat);
}
