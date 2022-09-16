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

  add = async (updateType, { id, comment }) => {
    try {
      const data = await this.#apiService.add(id, comment);
      this.#comments = data.comment;
      this._notify(UpdateType.MODEL, data.movie);
      this._notify(updateType, data.movie);
    } catch (err) {
      //
    }
  };

  delete = (updateType, id) => {
    const index = this.#comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  };

}
