import Observable from '../framework/observable.js';

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
    const { id } = data;
    try {
      this.#comments = await this.#apiService.get(id);
    } catch (err) {
      this.#comments = [];
    }

    this._notify(updateType, data);
  };

  add = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
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
