import { format, subDays } from "date-fns";

export function formatDateString(dateString: string, dateFormat = "dd MMMM yyyy H:mma") {
  const date = new Date(dateString);
  return format(date, dateFormat);
}

export function getPreviousDateFromToday(days: number) {
  return subDays(new Date(), days);
}
