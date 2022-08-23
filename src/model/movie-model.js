import { generateMovie } from '../mock/movie.js';
import { getRandomInt } from '../utils/random.js';

export default class MovieModel {
  #movies = Array.from({ length: getRandomInt(0, 17) }, generateMovie);

  get = () => this.#movies;
}
