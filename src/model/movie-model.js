import { generateMovie } from '../mock/movie.js';
import Observable from '../framework/observable.js';

export default class MovieModel extends Observable {
  #moviesApiService = null;

  #movies = Array.from({ length: 22 }, generateMovie);

  constructor(moviesApiService) {
    super();
    this.#moviesApiService = moviesApiService;

    this.#moviesApiService.movies.then((movies) => {
      console.log(movies);
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"
    });
  }


  get movies() {
    return this.#movies;
  }

  set movies(movies) {
    this.#movies = movies;
  }

  updateMovie = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      update,
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

}
