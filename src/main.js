import ProfileView from './view/profile-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import { render } from './framework/render.js';
import MovieModel from './model/movie-model.js';
import CommentsModel from './model/comments-model.js';
import NavigationView from './view/navigation-view.js';
import { generateFilter } from './mock/filter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const movieModel = new MovieModel();
const commentsModel = new CommentsModel();

render(new ProfileView(), siteHeaderElement);

const filters = generateFilter(movieModel.get());

render(new NavigationView(filters), siteMainElement);


const filmsPresenter = new FilmsPresenter();
filmsPresenter.init(siteMainElement, movieModel.get(), commentsModel.get());
