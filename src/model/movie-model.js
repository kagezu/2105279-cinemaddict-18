import { generateMovie } from '../mock/movie.js';
import { getRandomInt } from '../utils/random.js';
import Observable from '../framework/observable.js';
import { updateItem } from '../utils/common.js';

export default class MovieModel extends Observable {
  #movies = Array.from({ length: getRandomInt(0, 17) }, generateMovie);

  get movies() {
    return this.#movies;
  }

  set movies(movies) {
    this.#movies = movies;
  }

  updateMovie = (movie) => {
    this.#movies = updateItem(this.#movies, movie);
  };

}
