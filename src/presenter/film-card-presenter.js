import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import { render, remove, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';

export default class FilmCardPresenter {
  #container;
  #movie;
  #commentsModel;
  #detailsComponent = null;
  #cardComponent = null;
  #changeData = null;
  #isOpenDetail = false;
  #resetView = null;

  constructor(container, commentsModel, changeData, resetView) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#resetView = resetView;
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

  #updateDetailsComponent = () => {
    if (this.#isOpenDetail) {
      this.#hideDetailsComponent();
      this.#viewDetailsComponent();
    }
  };

  #handleWatchlistClick = () => {
    this.#movie.userDetails.watchList = !this.#movie.userDetails.watchList;
    this.#changeData(this.#movie);
    this.#updateDetailsComponent();
  };

  #handleWatchedClick = () => {
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    this.#changeData(this.#movie);
    this.#updateDetailsComponent();
  };

  #handleFavoriteClick = () => {
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
    this.#changeData(this.#movie);
    this.#updateDetailsComponent();
  };
}
