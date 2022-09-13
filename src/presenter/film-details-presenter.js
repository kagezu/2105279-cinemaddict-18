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

  constructor(container, movieModel, commentsModel) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#movieModel = movieModel;
  }

  init = (movie) => {

    if (this.#detailsComponent && this.#movie?.id === movie.id) {
      this.#movie = movie;
      this.#updateDetailsComponent();
      return;
    }

    this.#movie = movie;
    const prevDetailsComponent = this.#detailsComponent;
    this.#detailsComponent = new FilmDetailsView(this.#movie, this.#commentsModel.comments);
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
    }

    if (this.#container.contains(prevDetailsComponent?.element)) {
      replace(this.#detailsComponent, prevDetailsComponent);
    }

  };

  #closeDetailsView = () => {
    remove(this.#detailsComponent);
    this.#container.classList.remove('hide-overflow');
    this.#detailsComponent = null;
  };

  #handleWindowKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#closeDetailsView();
      window.removeEventListener('keydown', this.#handleWindowKeydown);
    }
  };

  /** Перерисовка попапа */
  #updateDetailsComponent = () => {
    this.#detailsComponent.updateElement({
      movie: this.#movie,
      listComments: this.#commentsModel.comments,
    });
  };

  // Добавление коментария

  #handleAddComment = (comment) => {
    this.#movie.comments.push(comment.id);

    this.#commentsModel.addComment(UpdateType.PATCH, comment);
    this.#movieModel.updateMovie(UpdateType.PATCH, this.#movie);
  };

  // удаление коментария

  #handleDeleteComment = (id) => {
    const index = this.#movie.comments.findIndex((commentId) => id === commentId);
    this.#movie.comments.splice(index, 1);

    this.#movieModel.updateMovie(UpdateType.PATCH, this.#movie);
    this.#commentsModel.deleteComment(UpdateType.PATCH, id);
  };

  //Изменение и обновление опций

  #handleWatchlistClick = () => {
    this.#movie.userDetails.watchList = !this.#movie.userDetails.watchList;
    this.#movieModel.updateMovie(UpdateType.MAJOR, this.#movie);
    this.#updateDetailsComponent();
  };

  #handleWatchedClick = () => {
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    this.#movieModel.updateMovie(UpdateType.MAJOR, this.#movie);
    this.#updateDetailsComponent();
  };

  #handleFavoriteClick = () => {
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
    this.#movieModel.updateMovie(UpdateType.MAJOR, this.#movie);
    this.#updateDetailsComponent();
  };

}
