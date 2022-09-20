import ApiService from '../framework/api-service.js';
import { Method } from '../const.js';

export default class FilmApi extends ApiService {

  get movies() {
    return this._load({ url: 'movies' })
      .then(ApiService.parseResponse)
      .then((movies) => movies.map(FilmApi.adaptToClient));
  }

  update = async (movie) => {
    try {
      const response = await this._load({
        url: `movies/${movie.id}`,
        method: Method.PUT,
        body: JSON.stringify(this.#adaptToServer(movie)),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });

      const parseResponse = await ApiService.parseResponse(response);
      return FilmApi.adaptToClient(parseResponse);
    } catch (err) {
      throw new Error('FilmApi.update()');
    }
  };

  static adaptToClient = (movie) => {
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

  #adaptToServer = (movie) => {
    const {
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
    } = movie;

    return {
      id,
      comments,
      'film_info':
      {
        title,
        'alternative_title': alternativeTitle,
        'total_rating': totalRating,
        poster,
        'age_rating': ageRating,
        director,
        writers,
        actors,
        release:
        {
          date,
          'release_country': releaseCountry
        },
        runtime,
        genre,
        description
      },
      'user_details':
      {
        watchlist,
        'already_watched': alreadyWatched,
        'watching_date': watchingDate,
        favorite
      }
    };
  };

}
