import FilmDetailsView from '../view/film-details-view.js';
import { render, remove, replace } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { isEscapeKey } from '../utils/common.js';
import { UpdateType, TimeLimit } from '../const.js';

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

    this.#uiBlocker.block();
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

  // Добавление коментария
  #handleAddComment = async (comment) => {
    this.#uiBlocker.block();
    try {
      await this.#commentsModel.add(UpdateType.MINOR, { comment, id: this.#movie.id });
    } catch (err) {
      this.#uiBlocker.unblock();
      // this.#detailsComponent.shake(() => { });
    }
  };

  // удаление коментария
  #handleDeleteComment = (id) => {
    this.#uiBlocker.block();
    this.#commentsModel.delete(UpdateType.MINOR, { id, movie: this.#movie });
  };


  //Изменение и обновление опций

  #updateMovie = () => {
    this.#uiBlocker.block();
    this.#movieModel.update(UpdateType.MINOR, this.#movie);
  };

  #handleWatchlistClick = () => {
    this.#movie.userDetails.watchlist = !this.#movie.userDetails.watchlist;
    this.#updateMovie();
  };

  #handleWatchedClick = () => {
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    this.#updateMovie();
  };

  #handleFavoriteClick = () => {
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
    this.#updateMovie();
  };

  /** Перерисовка и разблокировка попапа */
  #updateDetailsComponent = () => this.#detailsComponent.updateElement(
    {
      movie: this.#movie,
      comments: this.#commentsModel.comments,
      isBlocked: false
    });

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

    this.#uiBlocker.unblock();
  };
}
