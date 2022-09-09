import { generateMovie } from '../mock/movie.js';
import { getRandomInt } from '../utils/random.js';
import Observable from '../framework/observable.js';

export default class MovieModel extends Observable {
  #movies = Array.from({ length: getRandomInt(0, 17) }, generateMovie);

  get = () => this.#movies;
}
