import { getRandomInt, getRandomFloat, getRandomItem, getRandomArray } from '../utils.js';
import dayjs from 'dayjs';

const generateComments = () => {
  const count = getRandomInt(0, 7);
  return [...new Set(Array.from({ length: count }, () => getRandomInt(0, 14)))];
};

const directors = ['Tom Ford', 'Anthony Mann', 'Bruce Lee', 'Takeshi Kitano', 'King Martian'];
const posters = [
  'images/posters/made-for-each-other.png',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
  'images/posters/the-dance-of-life.jpg',
  'images/posters/the-great-flamarion.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg',
];
const names = [
  'Richard Weil',
  'Heinz Herald,',
  'Anne Wigton',
  'Anthony Mann',
  'Tom Ford',
  'Bruce Lee',
  'Takeshi Kitano',
  'King Martian',
];
const genres = [
  'Comedy',
  'Drama',
  'Mystery',
  'Film-Noir',
  'Musical',
  'Western',
  'Cartoon',
];
const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];
const titles = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'The Great Flamarion',
  'Made for Each Other',
];

const isTrue = () => Boolean(getRandomInt(0, 2));
const generateDate = () => isTrue() ? dayjs().add(getRandomInt(-20000, -1000), 'day').toDate() : null;

const generateInfo = () => ({
  'title': getRandomItem(titles),
  'alternativeTitle': getRandomItem(titles),
  'totalRating': getRandomFloat(1, 10, 1),
  'poster': getRandomItem(posters),
  'ageRating': getRandomInt(0, 21),
  'director': getRandomItem(directors),
  'writers': getRandomArray(names),
  'actors': getRandomArray(names),
  'release': {
    'date': generateDate(),
    'releaseCountry': 'Finland'
  },
  'runtime': getRandomInt(50, 100),
  'genre': getRandomArray(genres),
  'description': getRandomArray(descriptions).join('')
});

const generateUserDetails = () => ({
  'watchList': isTrue(),
  'alreadyWatched': isTrue(),
  'watchingDate': generateDate(),
  'favorite': isTrue()
});

export const generateMovie = (_v, id) => ({
  'id': id,
  'comments': generateComments(),
  'filmInfo': generateInfo(),
  'userDetails': generateUserDetails(),
});
