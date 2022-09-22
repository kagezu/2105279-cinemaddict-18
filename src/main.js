import FilmsPresenter from './presenter/films-presenter.js';
import NavigationPresenter from './presenter/navigation-presenter.js';
import ProfilePresenter from './presenter/profile-presenter.js';
import MovieModel from './model/movie-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import FilmApi from './api/film-api.js';
import CommentApi from './api/comment-api.js';

const AUTHORIZATION = 'Basic hf089f435fg578h75f0';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const filmApi = new FilmApi(END_POINT, AUTHORIZATION);
const commentApi = new CommentApi(END_POINT, AUTHORIZATION);
const movieModel = new MovieModel(filmApi);
const commentsModel = new CommentsModel(commentApi);
const filterModel = new FilterModel();

commentsModel.addObserver(movieModel.updateModel);

const profilePresenter = new ProfilePresenter(siteHeaderElement, movieModel);
const navigationPresenter = new NavigationPresenter(siteMainElement, filterModel, movieModel);
const filmsPresenter = new FilmsPresenter(siteMainElement, movieModel, commentsModel, filterModel);

profilePresenter.init();
navigationPresenter.init();
filmsPresenter.init();
movieModel.init();
