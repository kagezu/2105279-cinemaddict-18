import { generateComments } from '../mock/comments.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #comments = Array.from({ length: 15 }, generateComments);

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
