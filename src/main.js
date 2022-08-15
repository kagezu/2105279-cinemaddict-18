import ProfileView from './view/profile-view.js';
import FilmDetails from './view/film-details.js';
import FilmPresenter from './presenter/film-presenter.js';
import { render } from './render.js';
import MovieModel from './model/movie-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');

const movieModel = new MovieModel();

render(new ProfileView(), siteHeaderElement);
const filmPresenter = new FilmPresenter();
filmPresenter.init(siteMainElement, movieModel);
render(new FilmDetails(movieModel, 0), siteBodyElement);
