import { generateMovie } from '../mock/movie.js';
import { generateComments } from '../mock/comments.js';


export default class MovieModel {

  movies = Array.from({ length: 10 }, generateMovie);
  comments = Array.from({ length: 15 }, generateComments);

  getMovies = () => this.movies;
  getComments = () => this.comments;
}
