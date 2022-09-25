import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DurationType } from '../const.js';

dayjs.extend(duration);

/**
 *Преобразует в формат YYYY
 */
const formatStringToYear = (date) => dayjs(date).format('YYYY');

/**
 *Преобразует в формат DD MMMM YYYY
 */
const formatStringToDate = (date) => dayjs(date).format('DD MMMM YYYY');

/**
 *Преобразует  длительность в минутах, в часы и минуты
 */
const formatMinutesToTime = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');

/** Преобразует время в длительность от текущего момента в удобочитаемый вид*/
const formatStringToHumanization = (date) => {
  const difference = dayjs().diff(date, 'minutes');

  if (difference < DurationType.NOW) {
    return 'now';
  }
  if (difference < DurationType.FEW) {
    return 'a few minutes ago';
  }
  if (difference < DurationType.MINUTES) {
    return `${difference} minutes ago`;
  }
  if (difference < DurationType.HOURS) {
    return `${dayjs.duration(difference, 'minutes').format('H')} hours ago`;
  }
  if (difference < DurationType.DAYS) {
    return `${dayjs.duration(difference, 'minutes').format('D')} days ago`;
  }
  if (difference < DurationType.MOUNTS) {
    return `${dayjs.duration(difference, 'minutes').format('M')} mounts ago`;
  }
  return `${dayjs.duration(difference, 'minutes').format('Y')} years ago`;
};

export {
  formatStringToYear,
  formatStringToDate,
  formatMinutesToTime,
  formatStringToHumanization
};
