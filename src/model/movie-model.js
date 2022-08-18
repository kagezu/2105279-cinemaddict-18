import { generateMovie } from '../mock/movie.js';

export default class MovieModel {
  #movies = Array.from({ length: 12 }, generateMovie);

  get = () => this.#movies;
}
