import FilmCardView from '../view/film-card-view.js';
import { render, remove, replace } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import { getDeepCopy } from '../utils/common.js';

export default class FilmCardPresenter {
  #container;
  #movie;
  #cardComponent = null;
  #changeData = null;
  #openDetails;

  constructor(container, changeData, openDetails) {
    this.#container = container;
    this.#changeData = changeData;
    this.#openDetails = openDetails;
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

  setSaving = () => {
    this.#cardComponent.updateElement({
      isDisabled: true
    });
  };

  #resetState = () => {
    this.#cardComponent.updateElement({
      isDisabled: false
    });
  };

  setAborting = () => {
    this.#cardComponent.shake(this.#resetState);
  };

  destroy = () => remove(this.#cardComponent);

  // Показать попап
  #viewDetailsComponent = () => this.#openDetails(this.#movie);

  //Изменение и обновление опций

  #handleWatchlistClick = () => {
    const movie = getDeepCopy(this.#movie);
    movie.userDetails.watchlist = !movie.userDetails.watchlist;
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      movie
    );
  };

  #handleWatchedClick = () => {
    const movie = getDeepCopy(this.#movie);
    movie.userDetails.alreadyWatched = !movie.userDetails.alreadyWatched;
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      movie
    );
  };

  #handleFavoriteClick = () => {
    const movie = getDeepCopy(this.#movie);
    movie.userDetails.favorite = !movie.userDetails.favorite;
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      movie
    );
  };

}
