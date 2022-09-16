import ApiService from '../framework/api-service.js';
import { Method } from '../const.js';

export default class CommentApi extends ApiService {

  get movies() {
    return this._load({ url: 'movies' })
      .then(ApiService.parseResponse);
  }

  get = (id) => this._load({ url: `comments/${id}` })
    .then(ApiService.parseResponse);

  updateMovie = async (movie) => {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(movie),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await ApiService.parseResponse(response);
  };

}
