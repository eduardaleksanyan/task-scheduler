import { DateTime } from "luxon";

export const viewDate = (date: string, format = "MMMM d yyyy, HH:mm"): string => {
  return DateTime.fromISO(date).toFormat(format);
};
