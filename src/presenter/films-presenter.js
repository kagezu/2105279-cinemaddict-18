import SortView from '../view/sort-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListExtraView from '../view/film-list-extra-view.js';
import FilmsView from '../view/films-view.js';
import FilmListContainerView from '../view/film-list-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import LoadingView from '../view/loading-view.js';
import { render, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import FilmCardPresenter from './film-card-presenter.js';
import FilmDetailsPresenter from './film-details-presenter.js';
import { sortDate, sortRating } from '../utils/common.js';
import { SortType, UserAction, UpdateType, TimeLimit } from '../const.js';
import { filter } from '../utils/filter.js';

const CARD_COUNT_PER_STEP = 5;

export default class FilmsPresenter {

  #loadingComponent = new LoadingView();
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);
  #container;
  #filmsContainer;
  #filmListContainer;
  #showMoreButton = null;
  #sortComponent = null;
  #filmList;
  #filmDetailsPresenter;
  #commentsModel;
  #movieModel;
  #filterModel;

  #cardPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #renderedCardCount;
  #isLoading = true;

  constructor(container, movieModel, commentsModel, filterModel) {
    this.#container = container;
    this.#movieModel = movieModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#movieModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#filmDetailsPresenter = new FilmDetailsPresenter(document.body, movieModel, commentsModel);
  }

  init = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderViews();
  };

  get movies() {
    const filterType = this.#filterModel.filter;
    const movies = this.#movieModel.movies;
    const filteredMovies = filter[filterType](movies);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...filteredMovies].sort(sortDate);
      case SortType.RATING:
        return [...filteredMovies].sort(sortRating);
    }
    return filteredMovies;
  }

  get comments() {
    return this.#commentsModel;
  }

  #renderLoading = () => {
    render(this.#loadingComponent, this.#container);
  };

  /**Отрисовка всех шаблонов*/
  #renderViews = () => {
    this.#renderSort();
    this.#renderFilmContainer();
    this.#renderMoreButton();
    this.#handleLoadMoreCardClick();
  };

  /** Отрисовка карточек с высоким рейтингом*/
  #renderTopRated = () => {
  };

  /** Отрисовка карточек с большим количеством комментариев*/
  #renderMostCommented = () => {
  };

  /**Отрисовка контейнера для карточек*/
  #renderFilmContainer = () => {
    this.#filmsContainer = new FilmsView();
    this.#filmList = new FilmListView(this.#filterModel.filter, !this.movies.length);
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
    const moviesLength = this.movies.length;
    const lastComponent = Math.min(this.#renderedCardCount + CARD_COUNT_PER_STEP, moviesLength);
    this.#renderCardList(this.#renderedCardCount, lastComponent);
    this.#renderedCardCount = lastComponent;
    if (this.#renderedCardCount === moviesLength) {
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
  #clearViews = (sortType = null) => {
    this.#cardPresenter.forEach((presenter) => presenter.destroy());
    this.#cardPresenter.clear();
    this.#renderedCardCount = 0;
    remove(this.#showMoreButton);
    remove(this.#filmListContainer);
    remove(this.#filmList);
    remove(this.#filmsContainer);
    remove(this.#sortComponent);
    this.#currentSortType = sortType ? sortType : this.#currentSortType;
  };

  /**Отрисовка карточки фильма*/
  #renderCard = (movie) => {
    const cardComponent = new FilmCardPresenter(
      this.#filmListContainer.element,
      this.#handleViewAction,
      this.#filmDetailsPresenter.init
    );
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
    this.#clearViews(sortType);
    this.#renderViews();
  };

  /**Обработчик обновления модели*/
  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        try {
          this.#cardPresenter.get(update.id)?.setSaving();
          await this.#movieModel.update(updateType, update);
        } catch (err) {
          this.#cardPresenter.get(update.id)?.setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  /**Обработчик события модели*/
  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH: {
        this.#cardPresenter.get(data.id)?.init(data);
      }
        break;
      case UpdateType.MINOR:
        this.#clearViews();
        this.#renderViews();
        break;
      case UpdateType.MAJOR:
        this.#clearViews(SortType.DEFAULT);
        this.#renderViews();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderViews();
        break;
    }
  };

}
