import ApiService from '../framework/api-service.js';
import FilmApi from './film-api.js';
import { Method } from '../const.js';

export default class CommentApi extends ApiService {

  get = async (id) => {
    const response = await this._load({ url: `comments/${id}` });
    return await ApiService.parseResponse(response);
  };

  add = async (id, comment) => {
    const response = await this._load({
      url: `comments/${id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parseResponse = await ApiService.parseResponse(response);
    return {
      movie: FilmApi.adaptToClient(parseResponse.movie),
      comment: parseResponse.comments
    };
  };

  delete = async (id) => {
    const response = await this._load({
      url: `comments/${id}`,
      method: Method.DELETE,
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return response;
  };

}
