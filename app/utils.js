export function formatDate(date) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long', // e.g., "Monday"
      year: 'numeric', // e.g., "2025"
      month: 'long', // e.g., "January"
      day: 'numeric', // e.g., "30"
    });
    return formattedDate;
  }
  // utils.js or cn.js
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function parseServerActionResponse(response) {
  return JSON.parse(JSON.stringify(response));
}