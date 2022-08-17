import { generateComments } from '../mock/comments.js';

export default class CommentsModel {
  comments = Array.from({ length: 15 }, generateComments);

  get = () => this.comments;
}
