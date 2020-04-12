export const formatTotal = (total: number | undefined) =>
  total?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }) || "N/A";

export const getFutureDate = (daysFromNow: number) => {
  const date = new Date(Date.now());
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

export const getSecondsBetweenDates = (a: Date, b: Date) => {
  const diffTime = Math.abs(a.getMilliseconds() - b.getMilliseconds());
  return Math.ceil(diffTime / 1000);
};
