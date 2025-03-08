import dayjs from 'dayjs';

const FORMAT_TIME = 'HH:mm';
const FORMAT_DAY = 'MMM D';


function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const formatTime = (time) => dayjs(time).format(FORMAT_TIME);

const formatEventDate = (date) => dayjs(date).format(FORMAT_DAY);

const calculateDuration = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const diffInMinutes = end.diff(start, 'minute');

  const days = Math.floor(diffInMinutes / (60 * 24));
  const hours = Math.floor((diffInMinutes % (60 * 24)) / 60);
  const minutes = diffInMinutes % 60;

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (hours > 0) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${minutes}M`;
  }
};

const formatTimeRange = (startDate, endDate) => `${formatTime(startDate)} — ${formatTime(endDate)}`;


export {getRandomArrayElement, formatEventDate, calculateDuration, formatTimeRange};
