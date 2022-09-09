import { generateComments } from '../mock/comments.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #comments = Array.from({ length: 15 }, generateComments);

  get = () => this.#comments;
}
