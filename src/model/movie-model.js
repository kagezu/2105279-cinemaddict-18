import { generateMovie } from '../mock/movie.js';
import { generateComments } from '../mock/comments.js';


export default class MovieModel {

  movies = Array.from({ length: 5 }, generateMovie);
  comments = Array.from({ length: 5 }, generateComments);

  getMovies = () => this.movies;
  getComments = () => this.comments;
}
