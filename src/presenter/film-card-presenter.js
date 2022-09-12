import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import { render, remove, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import { UserAction, UpdateType, FilterType } from '../const.js';

export default class FilmCardPresenter {
  #container;
  #movie;
  #commentsModel;
  #filterModel;
  #detailsComponent = null;
  #cardComponent = null;
  #changeData = null;
  #isOpenDetail = false;
  #resetView = null;

  constructor(container, commentsModel, changeData, resetView, filterModel) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#resetView = resetView;
    this.#filterModel = filterModel;
  }

  init = (movie) => {
    this.#movie = movie;
    const prevCardComponent = this.#cardComponent;
    this.#cardComponent = new FilmCardView(movie);
    this.#cardComponent.setLinkClickHandler(this.#viewDetailsComponent);
    this.#cardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#cardComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#cardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (!prevCardComponent) {
      render(this.#cardComponent, this.#container);
    }

    if (this.#container.contains(prevCardComponent?.element)) {
      replace(this.#cardComponent, prevCardComponent);
      this.#updateDetailsComponent();
    }
  };

  destroy = () => {
    remove(this.#cardComponent);
  };

  resetDetailsView = () => {
    if (this.#isOpenDetail) {
      this.#hideDetailsComponent();
    }
  };

  #hideDetailsComponent = () => {
    remove(this.#detailsComponent);
    document.body.classList.remove('hide-overflow');
    this.#isOpenDetail = false;
  };

  #onWindowKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#hideDetailsComponent();
      window.removeEventListener('keydown', this.#onWindowKeydown);
    }
  };

  #viewDetailsComponent = () => {
    if (!this.#isOpenDetail) {
      remove(FilmDetailsView.getOpenPopup());
      this.#resetView();
      this.#detailsComponent = new FilmDetailsView(this.#movie, this.#commentsModel.comments);
      this.#detailsComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
      this.#detailsComponent.setWatchedClickHandler(this.#handleWatchedClick);
      this.#detailsComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
      this.#detailsComponent.setDeleteCommentHandler(this.#handleDeleteCommentClick);
      this.#detailsComponent.setAddCommentHandler(this.#handleAddCommentClick);
      this.#detailsComponent.setCloseButtonClickHandler(() => {
        this.#hideDetailsComponent();
        window.removeEventListener('keydown', this.#onWindowKeydown);
      });
      document.body.classList.add('hide-overflow');
      render(this.#detailsComponent, document.body);
      window.addEventListener('keydown', this.#onWindowKeydown);
      this.#isOpenDetail = true;
    }
  };

  /** Перерисовка попапа */
  #updateDetailsComponent = () => {
    if (this.#isOpenDetail) {
      this.#detailsComponent.updateElement({
        movie: this.#movie,
        listComments: this.#commentsModel.comments,
        emotion: null,
        message: null
      });
    }
  };

  // Добавление коментария

  #handleAddCommentClick = (comment) => {
    this.#movie.comments.push(comment.id);
    const movie = this.#movie;
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      { comment, movie }
    );
  };

  // удаление коментария

  #handleDeleteCommentClick = (id) => {

    const index = this.#movie.comments.findIndex((commentId) => id === commentId);
    this.#movie.comments.splice(index, 1);
    const movie = this.#movie;
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      { id, movie }
    );
  };

  //Изменение и обновление опций

  #getUpdateType = (isChecked, isFiltered) => !isChecked && isFiltered ? UpdateType.MINOR : UpdateType.PATCH;

  #handleWatchlistClick = () => {
    const newValue = !this.#movie.userDetails.watchList;
    this.#movie.userDetails.watchList = newValue;
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      this.#getUpdateType(newValue, this.#filterModel.filter === FilterType.WATCHLIST),
      this.#movie
    );
  };

  #handleWatchedClick = () => {
    const newValue = !this.#movie.userDetails.alreadyWatched;
    this.#movie.userDetails.alreadyWatched = newValue;
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.PATCH,
      this.#movie
    );
  };

  #handleFavoriteClick = () => {
    const newValue = !this.#movie.userDetails.favorite;
    this.#movie.userDetails.favorite = newValue;
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      this.#getUpdateType(newValue, this.#filterModel.filter === FilterType.FAVORITES),
      this.#movie
    );
  };

}
