import ProfileView from './view/profile-view.js';
import FilmDetails from './view/film-details.js';
import FilmPresenter from './presenter/film-presenter.js';
import { render } from './render.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');

render(new ProfileView(), siteHeaderElement);
const filmPresenter = new FilmPresenter();
filmPresenter.init(siteMainElement);
render(new FilmDetails(), siteBodyElement);
