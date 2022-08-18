import { generateMovie } from '../mock/movie.js';
import { getRandomInt } from '../utils.js';

export default class MovieModel {
  #movies = Array.from({ length: getRandomInt(0, 7) }, generateMovie);

  get = () => this.#movies;
}
