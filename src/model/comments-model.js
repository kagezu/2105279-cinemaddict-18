import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #comments = [];
  #moviesApiService;

  constructor(moviesApiService) {
    super();
    this.#moviesApiService = moviesApiService;
  }

  downloadComments = async (updateType, data) => {
    const { id } = data;
    try {
      this.#comments[id] = await this.#moviesApiService.getMovieComments(id);
    } catch (err) {
      this.#comments[id] = [];
    }

    this._notify(updateType, data);
  };

  getComments = (id) => this.#comments[id];

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
