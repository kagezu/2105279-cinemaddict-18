import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class FilmsApiService extends ApiService {

  get movies() {
    return this._load({ url: 'movies' })
      .then(ApiService.parseResponse);
  }

  getMovieComments = (id) => this._load({ url: `comments/${id}` })
    .then(ApiService.parseResponse);

  updateMovie = async (movie) => {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(movie),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
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
