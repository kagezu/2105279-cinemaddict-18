import FilmsPresenter from './presenter/films-presenter.js';
import NavigationPresenter from './presenter/navigation-presenter.js';
import { render } from './framework/render.js';
import MovieModel from './model/movie-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import ProfileView from './view/profile-view.js';
import FilmsApiService from './films-api-service.js';

const AUTHORIZATION = 'Basic hf08954hw578h75f0';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const movieModel = new MovieModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();

render(new ProfileView(), siteHeaderElement);

const navigationPresenter = new NavigationPresenter(siteMainElement, filterModel, movieModel);
const filmsPresenter = new FilmsPresenter(siteMainElement, movieModel, commentsModel, filterModel);

navigationPresenter.init();
filmsPresenter.init();
movieModel.init();
