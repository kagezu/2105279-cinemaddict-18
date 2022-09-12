import FilmsPresenter from './presenter/films-presenter.js';
import NavigationPresenter from './presenter/navigation-presenter.js';
import { render } from './framework/render.js';
import MovieModel from './model/movie-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import ProfileView from './view/profile-view.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const movieModel = new MovieModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();

render(new ProfileView(), siteHeaderElement);

const navigationPresenter = new NavigationPresenter(siteMainElement, filterModel, movieModel);
const filmsPresenter = new FilmsPresenter(siteMainElement, movieModel, commentsModel, filterModel);

navigationPresenter.init();
filmsPresenter.init();
