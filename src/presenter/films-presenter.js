import SortView from '../view/sort-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmsView from '../view/films-view.js';
import FilmListContainerView from '../view/film-list-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import { render, remove } from '../framework/render.js';
import FilmCardPresenter from './film-card-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';

const CARD_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #filmsContainer;
  #filmListContainer;
  #showMoreButton;
  #sortComponent;
  #filmList;
  #container;
  #movies;
  #comments;
  #renderedCardCount = 0;
  #cardPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedFilmCards = [];

  init = (container, movies, comments) => {
    this.#container = container;
    this.#movies = movies;
    this.#sourcedFilmCards = [...movies];
    this.#comments = comments;
    this.#renderViews();
  };

  get movies() {
    return this.#movies;
  }

  get comments() {
    return this.#comments;
  }

  /**
  * Отрисовка всех шаблонов
  */
  #renderViews = () => {
    this.#showMoreButton = new ShowMoreButtonView();
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
    this.#filmsContainer = new FilmsView();
    this.#filmList = new FilmListView(!this.#movies.length);
    this.#filmListContainer = new FilmListContainerView();

    render(this.#filmsContainer, this.#container);
    render(this.#filmList, this.#filmsContainer.element);
    render(this.#filmListContainer, this.#filmList.element);
  };

  /**
  * Отрисовка опций сортировки
  */
  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#sortComponent, this.#container);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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
    this.#renderCardList(this.#renderedCardCount, lastComponent);
    this.#renderedCardCount = lastComponent;
    if (this.#renderedCardCount === this.#movies.length) {
      remove(this.#showMoreButton);
    }
  };

  /**
  * Отрисовка части карточек
  */
  #renderCardList = (from, to) => {
    this.#movies
      .slice(from, to)
      .forEach((movie) => this.#renderCard(movie));
  };

  /**
  * Очистка всех шаблонов
  */
  #clearViews = () => {
    this.#cardPresenter.forEach((presenter) => presenter.destroy());
    this.#cardPresenter.clear();
    this.#renderedCardCount = 0;
    remove(this.#showMoreButton);
    remove(this.#filmListContainer);
    remove(this.#filmList);
    remove(this.#filmsContainer);
    remove(this.#sortComponent);
  };

  /**
  * Отрисовка карточки фильма
  */
  #renderCard = (movie) => {
    const cardComponent = new FilmCardPresenter(this.#filmListContainer.element, this.#comments, this.#handleCardChange, this.#handleResetDetail);
    cardComponent.init(movie);
    this.#cardPresenter.set(movie.id, cardComponent);
  };


  /**
   * Обработчик сортировки карточек фильмов
   */
  #handleSortTypeChange = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#movies.sort((a, b) => a.filmInfo.release.date > b.filmInfo.release.date);
        break;
      case SortType.RATING:
        this.#movies.sort((a, b) => a.filmInfo.totalRating > b.filmInfo.totalRating);
        break;
      default:
        this.#movies = [...this.#sourcedFilmCards];
    }
    this.#currentSortType = sortType;
    this.#clearViews();
    this.#renderViews();
  };

  /**
   * Обработчик обновления карточки фильмов
   */
  #handleCardChange = (updatedCard) => {
    this.#movies = updateItem(this.#movies, updatedCard);
    this.#cardPresenter.get(updatedCard.id).init(updatedCard);
  };

  /**
   * Обработчик закрывающий все попапы
   */
  #handleResetDetail = () => {
    this.#cardPresenter.forEach((presenter) => presenter.resetDetailsView());
  };
}
