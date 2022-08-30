import SortView from '../view/sort-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmsView from '../view/films-view.js';
import FilmListContainerView from '../view/film-list-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import { render, remove } from '../framework/render.js';
import FilmCardPresenter from './film-card-presenter.js';

const CARD_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #filmsContainer = new FilmsView();
  #filmListContainer = new FilmListContainerView();
  #showMoreButton = new ShowMoreButtonView();
  #filmList;
  #container;
  #movies;
  #comments;
  #renderedCardCount = 0;

  init = (container, movies, comments) => {
    this.#container = container;
    this.#movies = movies;
    this.#comments = comments;
    this.#showMoreButton.setClickHandler(this.#onLoadMoreCardClick);

    this.#renderSort();
    this.#renderFilmContainer();
    this.#renderMoreButton();
    this.#onLoadMoreCardClick();
  };

  /**
  * Отрисовка контейнера для карточек
  */
  #renderFilmContainer = () => {
    this.#filmList = new FilmListView(!this.#movies.length);
    render(this.#filmsContainer, this.#container);
    render(this.#filmList, this.#filmsContainer.element);
    render(this.#filmListContainer, this.#filmList.element);
  };

  /**
  * Отрисовка опций сортировки
  */
  #renderSort = () => {
    render(new SortView(), this.#container);
  };

  /**
  * Отрисовка кнопки "Show more"
  */
  #renderMoreButton = () => {
    render(this.#showMoreButton, this.#filmList.element);
  };

  /**
  * Дорисовка карточек фильмов
  */
  #onLoadMoreCardClick = () => {
    const lastComponent = Math.min(this.#renderedCardCount + CARD_COUNT_PER_STEP, this.#movies.length);
    this.#renderCards(this.#renderedCardCount, lastComponent);
    this.#renderedCardCount = lastComponent;
    if (this.#renderedCardCount === this.#movies.length) {
      remove(this.#showMoreButton);
    }
  };

  /**
  * Отрисовка части карточек
  */
  #renderCards = (from, to) => {
    this.#movies
      .slice(from, to)
      .forEach((movie) => this.#renderCard(movie));
  };

  /**
  * Отрисовка карточки фильма
  */
  #renderCard = (movie) => {
    const cardComponent = new FilmCardPresenter(this.#filmListContainer.element, this.#comments);
    cardComponent.init(movie);
  };
}
