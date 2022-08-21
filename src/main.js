import ProfileView from './view/profile-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import { render } from './framework/render.js';
import MovieModel from './model/movie-model.js';
import CommentsModel from './model/comments-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const movieModel = new MovieModel();
const commentsModel = new CommentsModel();

render(new ProfileView(), siteHeaderElement);
const filmsPresenter = new FilmsPresenter();
filmsPresenter.init(siteMainElement, movieModel.get(), commentsModel.get());
