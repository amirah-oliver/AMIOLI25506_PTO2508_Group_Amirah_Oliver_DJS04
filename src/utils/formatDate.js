/**
 * Converts date into a human readable format 
 * @param {string} date
 * @returns {string}
 */
export function formatDate(date) {
  const updatedDate = new Date(date);
  const currentDate = new Date();

  const difference =
    currentDate.getTime() - updatedDate.getTime();

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  if (days === 0) {
    return "Today";
  }

  if (days === 1) {
    return "1 day ago";
  }

  return `${days} days ago`;
}
