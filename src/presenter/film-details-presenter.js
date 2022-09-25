import FilmDetailsView from '../view/film-details-view.js';
import { render, remove, replace } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { isEscapeKey } from '../utils/common.js';
import { UpdateType, TimeLimit, UserAction } from '../const.js';

export default class FilmDetailsPresenter {
  #container;
  #movieModel;
  #commentsModel;
  #movie = null;
  #detailsComponent = null;
  #isOpenDetails = false;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(container, movieModel, commentsModel) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#movieModel = movieModel;
  }

  init = (movie) => {

    if (this.#isOpenDetails && this.#movie?.id === movie.id) {
      return;
    }

    this.#movie = movie;
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#movieModel.addObserver(this.#handleModelEvent);

    const prevDetailsComponent = this.#detailsComponent;
    this.#detailsComponent = new FilmDetailsView(this.#movie);
    this.#detailsComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#detailsComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#detailsComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#detailsComponent.setDeleteCommentHandler(this.#handleDeleteComment);
    this.#detailsComponent.setAddCommentHandler(this.#handleAddComment);
    this.#detailsComponent.setCloseButtonClickHandler(() => {
      this.#closeDetailsView();
      window.removeEventListener('keydown', this.#handleWindowKeydown);
    });
    this.#container.classList.add('hide-overflow');

    if (!prevDetailsComponent) {
      window.addEventListener('keydown', this.#handleWindowKeydown);
      render(this.#detailsComponent, this.#container);
      this.#isOpenDetails = true;
    }

    if (this.#container.contains(prevDetailsComponent?.element)) {
      replace(this.#detailsComponent, prevDetailsComponent);
      remove(prevDetailsComponent);
    }

    this.#commentsModel.download(UpdateType.PATCH, this.#movie);
  };

  #closeDetailsView = () => {
    remove(this.#detailsComponent);
    this.#container.classList.remove('hide-overflow');
    this.#detailsComponent = null;
    this.#isOpenDetails = false;
  };

  #handleWindowKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#closeDetailsView();
      window.removeEventListener('keydown', this.#handleWindowKeydown);
    }
  };

  // Добавление комментария
  #handleAddComment = (comment) => {
    this.#viewAction(UserAction.ADD_COMMENT, UpdateType.MINOR, { comment, id: this.#movie.id });
  };

  // удаление комментария
  #handleDeleteComment = (id) => {
    this.#viewAction(UserAction.DELETE_COMMENT, UpdateType.MINOR, { id, movie: this.#movie });
  };

  //Изменение опций

  #handleWatchlistClick = () => {
    const movie = structuredClone(this.#movie);
    movie.userDetails.watchlist = !movie.userDetails.watchlist;
    this.#viewAction(UserAction.UPDATE_MOVIE, UpdateType.MINOR, movie);
  };

  #handleWatchedClick = () => {
    const movie = structuredClone(this.#movie);
    movie.userDetails.alreadyWatched = !movie.userDetails.alreadyWatched;
    this.#viewAction(UserAction.UPDATE_MOVIE, UpdateType.MINOR, movie);
  };

  #handleFavoriteClick = () => {
    const movie = structuredClone(this.#movie);
    movie.userDetails.favorite = !movie.userDetails.favorite;
    this.#viewAction(UserAction.UPDATE_MOVIE, UpdateType.MINOR, movie);
  };

  /** Перерисовка и разблокировка попапа */
  #resetDetailsComponent = () => this.#detailsComponent.updateElement(
    {
      movie: this.#movie,
      comments: this.#commentsModel.comments,
      isBlocked: false,
      deleteId: null
    });

  #viewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        try {
          this.#detailsComponent.updateElement({ isBlocked: true });
          await this.#movieModel.update(updateType, update);
        } catch (err) {
          this.#detailsComponent.shake(this.#resetDetailsComponent);
        }
        break;

      case UserAction.DELETE_COMMENT:
        try {
          this.#detailsComponent.updateElement({ deleteId: update.id, isBlocked: true });
          await this.#commentsModel.delete(updateType, update);
        } catch (err) {
          this.#detailsComponent.shake(this.#resetDetailsComponent);
        }
        break;

      case UserAction.ADD_COMMENT:
        try {
          this.#detailsComponent.updateElement({ isBlocked: true });
          await this.#commentsModel.add(updateType, update);
          this.#detailsComponent.updateElement({ message: null, emotion: null });
        } catch (err) {
          this.#detailsComponent.shake(this.#resetDetailsComponent);
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  /**Обработчик события модели*/
  #handleModelEvent = (updateType, data) => {

    if (!this.#isOpenDetails) {
      return;
    }

    switch (updateType) {

      case UpdateType.PATCH:
        this.#movie = data;
        this.#resetDetailsComponent();
        break;

      case UpdateType.MINOR:
        this.#movie = data;
        this.#resetDetailsComponent();
        break;
    }
  };
}
