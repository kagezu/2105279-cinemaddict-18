import Observable from '../framework/observable.js';
// import { UpdateType } from '../const.js';

export default class CommentsModel extends Observable {
  #comments = [];
  #moviesApiService;

  constructor(moviesApiService) {
    super();
    this.#moviesApiService = moviesApiService;
  }

  getComment = (id) => {
    this.#moviesApiService.getComment(id)
      .then((comment) => this.addComment(null, comment));
  };

  get comments() {
    return this.#comments;
  }

  set comments(comments) {
    this.#comments = comments;
  }

  addComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  };

  deleteComment = (updateType, id) => {
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
