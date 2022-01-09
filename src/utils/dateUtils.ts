import { format } from "date-fns";

const datesAreOnSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

export const getDate = (unixTimeStamp: number | null | undefined) => {
  if (unixTimeStamp) {
    const milisecconds = unixTimeStamp * 1000;
    const todayDate = new Date();
    const messagedDate = new Date(milisecconds);

    const areDaysEqual = datesAreOnSameDay(todayDate, messagedDate);
    return areDaysEqual? format(messagedDate, "HH:dd") : format(messagedDate, "MMM dd");
  }
  return "";
};