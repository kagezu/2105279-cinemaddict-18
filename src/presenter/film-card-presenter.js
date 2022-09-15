import FilmCardView from '../view/film-card-view.js';
import { render, remove, replace } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';

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

  destroy = () => remove(this.#cardComponent);

  // Показать попап
  #viewDetailsComponent = () => this.#openDetails(this.#movie);

  //Изменение и обновление опций

  #handleWatchlistClick = () => {
    this.#movie.userDetails.watchList = !this.#movie.userDetails.watchList;
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      this.#movie
    );
  };

  #handleWatchedClick = () => {
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      this.#movie
    );
  };

  #handleFavoriteClick = () => {
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      this.#movie
    );
  };

}
