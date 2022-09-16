import FilmDetailsView from '../view/film-details-view.js';
import { render, remove, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import { UpdateType } from '../const.js';

export default class FilmDetailsPresenter {
  #container;
  #movieModel;
  #commentsModel;
  #movie = null;
  #detailsComponent = null;
  #isOpenDetails = false;

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
    this.#movieModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);

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
    window.addEventListener('keydown', this.#handleWindowKeydown);

    if (!prevDetailsComponent) {
      render(this.#detailsComponent, this.#container);
      this.#isOpenDetails = true;
    }

    if (this.#container.contains(prevDetailsComponent?.element)) {
      replace(this.#detailsComponent, prevDetailsComponent);
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

  /** Перерисовка попапа */
  #updateDetailsComponent = () => this.#detailsComponent.updateElement(
    {
      movie: this.#movie,
      comments: this.#commentsModel.comments,
    });

  // Добавление коментария

  #handleAddComment = (comment) => {
    this.#movie.comments.push(comment.id);

    this.#commentsModel.add(UpdateType.PATCH, comment);
    // this.#movieModel.updateMovie(UpdateType.PATCH, this.#movie);
  };

  // удаление коментария

  #handleDeleteComment = (id) => {
    const index = this.#movie.comments.findIndex((commentId) => id === commentId);
    this.#movie.comments.splice(index, 1);

    // this.#movieModel.updateMovie(UpdateType.PATCH, this.#movie);
    this.#commentsModel.delete(UpdateType.PATCH, id);
  };

  //Изменение и обновление опций

  #handleWatchlistClick = () => {
    this.#movie.userDetails.watchlist = !this.#movie.userDetails.watchlist;
    this.#movieModel.update(UpdateType.MINOR, this.#movie);
  };

  #handleWatchedClick = () => {
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    this.#movieModel.update(UpdateType.MINOR, this.#movie);
  };

  #handleFavoriteClick = () => {
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
    this.#movieModel.update(UpdateType.MINOR, this.#movie);
  };

  /**Обработчик события модели*/
  #handleModelEvent = (updateType, data) => {

    if (!this.#isOpenDetails) {
      return;
    }

    switch (updateType) {

      case UpdateType.PATCH:
        this.#movie = data;
        this.#updateDetailsComponent();
        break;

      case UpdateType.MINOR:
        this.#movie = data;
        this.#updateDetailsComponent();
        break;
    }
  };

}
