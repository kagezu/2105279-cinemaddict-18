import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class CommentsModel extends Observable {
  #comments = [];
  #apiService;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get comments() {
    return this.#comments;
  }

  download = async (updateType, data) => {
    try {
      this.#comments = await this.#apiService.get(data.id);
    } catch (err) {
      this.#comments = [];
    }
    this._notify(updateType, data);
  };

  // Добавление комментария
  add = async (updateType, { id, comment }) => {
    let data;
    try {
      data = await this.#apiService.add(id, comment);
    } catch (err) {
      throw new Error('CommentsModel.add()');
    }

    this.#comments = data.comment;
    this._notify(UpdateType.MODEL, data.movie);
    this._notify(updateType, data.movie);
  };

  // Удаление комментария
  delete = async (updateType, { id, movie }) => {
    try {
      await this.#apiService.delete(id);
      const index = movie.comments.findIndex((comment) => comment === id);
      movie.comments.splice(index, 1);
    } catch (err) {
      throw new Error('CommentsModel.delete()');
    }

    this._notify(UpdateType.MODEL, movie);
    this._notify(updateType, movie);
  };

}
