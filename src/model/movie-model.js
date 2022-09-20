import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class MovieModel extends Observable {
  #apiService = null;
  #movies = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      this.#movies = await this.#apiService.movies;
    } catch (err) {
      this.#movies = [];
    }

    this._notify(UpdateType.INIT);
  };

  get movies() {
    return this.#movies;
  }

  get = (id) => this.#movies.find((movie) => movie.id === id);

  update = async (updateType, update) => {
    try {
      const movie = await this.#apiService.update(update);
      this.#setMovie(movie);
      this._notify(updateType, movie);
    } catch (err) {
      throw new Error('MovieModel.update()');
    }
  };

  updateModel = (updateType, update) => {
    if (updateType === UpdateType.MODEL) {
      this.#setMovie(update);
    }
  };

  #setMovie = (movie) => {

    const index = this.#movies.findIndex(({ id }) => id === movie.id);

    if (index === -1) {
      throw new Error('MovieModel.#setMovie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      movie,
      ...this.#movies.slice(index + 1),
    ];
  };
}
