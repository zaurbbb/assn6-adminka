import moment from "moment";

export const formattedDate = (date: string) => {
  return moment(date).format('D MMM YYYY');
};

export const formattedDateISO = (date: string) => {
  return date.split('T')[0];
};
export const formattedTime = (date: string) => {
  const dateString = new Date(date)
  const hours = String(dateString.getUTCHours()).padStart(2, '0');
  const minutes = String(dateString.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formattedDateTime = (date: string) => {
  return moment(date).format('D MMM YYYY, HH:mm');
};

export const formatDateRange = (start: string, end: string) => {
  if (!start || !end) {
    return;
  }

  return `${formattedDateTime(start)} - ${formattedDateTime(end)}`;
};