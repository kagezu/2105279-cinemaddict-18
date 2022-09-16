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

  update = async (updateType, update) => {

    const index = this.#movies.findIndex(({ id }) => id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    const movie = await this.#apiService.update(update);

    this.#movies = [
      ...this.#movies.slice(0, index),
      movie,
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType, movie);
  };

}
