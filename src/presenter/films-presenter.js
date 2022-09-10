import SortView from '../view/sort-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmsView from '../view/films-view.js';
import FilmListContainerView from '../view/film-list-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import { render, remove } from '../framework/render.js';
import FilmCardPresenter from './film-card-presenter.js';
import { sortDate, sortRating } from '../utils/common.js';
import { SortType, UserAction, UpdateType } from '../const.js';

const CARD_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #filmsContainer;
  #filmListContainer;
  #showMoreButton = null;
  #sortComponent = null;
  #filmList;
  #container;
  #commentsModel;
  #renderedCardCount;
  #cardPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #movieModel;

  constructor(container, movieModel, commentsModel) {
    this.#container = container;
    this.#movieModel = movieModel;
    this.#commentsModel = commentsModel;

    this.#movieModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderViews();
  };

  get movies() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#movieModel.movies].sort(sortDate);
      case SortType.RATING:
        return [...this.#movieModel.movies].sort(sortRating);
    }
    return this.#movieModel.movies;
  }

  get comments() {
    return this.#commentsModel;
  }

  /**Отрисовка всех шаблонов*/
  #renderViews = () => {
    this.#renderSort();
    this.#renderFilmContainer();
    this.#renderMoreButton();
    this.#handleLoadMoreCardClick();
  };

  /**Отрисовка контейнера для карточек*/
  #renderFilmContainer = () => {
    this.#filmsContainer = new FilmsView();
    this.#filmList = new FilmListView(!this.movies.length);
    this.#filmListContainer = new FilmListContainerView();

    render(this.#filmsContainer, this.#container);
    render(this.#filmList, this.#filmsContainer.element);
    render(this.#filmListContainer, this.#filmList.element);
  };

  /**Отрисовка опций сортировки*/
  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#sortComponent, this.#container);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  /**Отрисовка кнопки "Show more"*/
  #renderMoreButton = () => {
    this.#renderedCardCount = 0;
    this.#showMoreButton = new ShowMoreButtonView();
    this.#showMoreButton.setClickHandler(this.#handleLoadMoreCardClick);
    render(this.#showMoreButton, this.#filmList.element);
  };

  /**Дорисовка карточек фильмов*/
  #handleLoadMoreCardClick = () => {
    const lastComponent = Math.min(this.#renderedCardCount + CARD_COUNT_PER_STEP, this.movies.length);
    this.#renderCardList(this.#renderedCardCount, lastComponent);
    this.#renderedCardCount = lastComponent;
    if (this.#renderedCardCount === this.movies.length) {
      remove(this.#showMoreButton);
    }
  };

  /**Отрисовка части карточек*/
  #renderCardList = (from, to) => {
    this.movies
      .slice(from, to)
      .forEach((movie) => this.#renderCard(movie));
  };

  /**Очистка всех шаблонов*/
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

  /**Отрисовка карточки фильма*/
  #renderCard = (movie) => {
    const cardComponent = new FilmCardPresenter(this.#filmListContainer.element, this.#commentsModel, this.#handleViewAction, this.#handleResetDetail);
    cardComponent.init(movie);
    this.#cardPresenter.set(movie.id, cardComponent);
  };


  /** Обработчик сортировки карточек фильмов
   * @type {SortType} sortType
   */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearViews();
    this.#renderViews();
  };

  /**Обработчик закрывающий все попапы*/
  #handleResetDetail = () => {
    this.#cardPresenter.forEach((presenter) => presenter.resetDetailsView());
  };

  /**Обработчик обновления модели*/
  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        // this.#movieModel.updateMovie(updateType, update);
        this.#cardPresenter.get(update.id).init(update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update);
        break;
    }
  };

  /**Обработчик события модели*/
  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:
        this.#cardPresenter.get(data.id).init(data);
        this.#clearViews();
        this.#renderViews();
        break;
      case UpdateType.MAJOR:
        this.#clearViews();
        this.#renderViews();
        break;
    }
    this.#movieModel.updateMovie(data);
  };

}
