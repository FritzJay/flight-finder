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

export const getTimeStringSinceDate = (a: Date) => {
  const seconds = Math.abs(a.getSeconds() - new Date(Date.now()).getSeconds());
  if (seconds <= 0) return "Less than a second ago";
  else if (seconds < 60) return `${seconds} seconds ago`;
  else if (seconds < 60 * 60) return `${Math.floor(seconds / 60)} minutes ago`;
  else if (seconds < 60 * 60 * 60)
    return `${Math.floor((seconds / 60) * 60)} hours ago`;
  else if (seconds < 60 * 60 * 60 * 24)
    return `${Math.floor(seconds / (60 * 60 * 60 * 24))} days ago`;
  else return "A long long time ago";
};
