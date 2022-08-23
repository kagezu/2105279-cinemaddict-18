import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

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
 *Преобразует в формат YYYY/MM/DD hh:mm
 */
const formatStringToDateWithTime = (date) => dayjs(date).format('YYYY/MM/DD hh:mm');

/**
 *Преобразует  длительность в минутах, в часы и минуты
 */
const formatMinutesToTime = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');

export {
  formatStringToYear,
  formatStringToDate,
  formatStringToDateWithTime,
  formatMinutesToTime
};
