import { generateMovie } from '../mock/movie.js';
import Observable from '../framework/observable.js';

export default class MovieModel extends Observable {
  #moviesApiService = null;

  #movies = Array.from({ length: 22 }, generateMovie);

  constructor(moviesApiService) {
    super();
    this.#moviesApiService = moviesApiService;

    this.#moviesApiService.movies.then((movies) => {
      this.#movies = movies.map(this.#adaptToClient);
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

  #adaptToClient = (movie) => {
    const {
      id,
      comments,
      film_info:
      {
        title,
        alternative_title: alternativeTitle,
        total_rating: totalRating,
        poster,
        age_rating: ageRating,
        director,
        writers,
        actors,
        release:
        {
          date,
          release_country: releaseCountry
        },
        runtime,
        genre,
        description
      },
      user_details:
      {
        watchlist,
        already_watched: alreadyWatched,
        watching_date: watchingDate,
        favorite
      }
    } = movie;

    return {
      id,
      comments,
      filmInfo:
      {
        title,
        alternativeTitle,
        totalRating,
        poster,
        ageRating,
        director,
        writers,
        actors,
        release:
        {
          date,
          releaseCountry
        },
        runtime,
        genre,
        description
      },
      userDetails:
      {
        watchlist,
        alreadyWatched,
        watchingDate,
        favorite
      }
    };
  };

}
