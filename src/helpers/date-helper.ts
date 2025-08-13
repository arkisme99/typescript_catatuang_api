import { format, parse } from "date-fns";

/**
 * Convert date string (e.g. "2025-01-01 10:10:10") to Date object
 * dikirim dari BE ke FE
 */
export function stringToDate(dateStr: string): Date {
  return parse(dateStr, "yyyy-MM-dd HH:mm:ss", new Date());
}

/**
 * Convert Date object to string "YYYY-MM-DD HH:MM:SS"
 * dikirim dari FE ke BE (Database)
 */
export function dateToString(date: Date): string {
  return format(date, "yyyy-MM-dd HH:mm:ss");
}

/**
 * Format date string to another format
 * e.g. formatDateString("2025-01-01 10:10:10", "dd/MM/yyyy") => "01/01/2025"
 */
export function formatDateString(
  dateStr: string,
  outputFormat: string
): string {
  const date = stringToDate(dateStr);
  return format(date, outputFormat);
}
