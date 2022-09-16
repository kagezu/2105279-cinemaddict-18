import AbstractView from '../framework/view/abstract-view.js';
import { formatStringToYear, formatMinutesToTime } from '../utils/date.js';

const createTitle = (title) => title ? `<h3 class="film-card__title">${title}</h3>` : '';
const createRating = (rating) => rating ? `<p class="film-card__rating">${rating}</p>` : '';
const createYear = ({ date }) => date ? `<span class="film-card__year">${formatStringToYear(date)}</span>` : '';
const createDuration = (runtime) => runtime ? `<span class="film-card__duration">${formatMinutesToTime(runtime)}</span>` : '';
const createGenre = (genres) => genres ? `<span class="film-card__genre">${genres.join(' ')}</span>` : '';
const createPoster = (poster) => poster ? `<img src="${poster}" alt="" class="film-card__poster">` : '';
const createDescription = (description) => {
  let result = '';
  if (description) {
    const text = description.length > 140 ? `${description.slice(0, 139)}...` : description;
    result = `<p class="film-card__description">${text}</p>`;
  }
  return result;
};
const createCountComments = ({ length }) => {
  const count = length ? `${length} comments` : 'No comments yet';
  return `<span class="film-card__comments">${count}</span>`;
};
const createButton = (style, text, activated) => {
  const activatedStyle = activated ? ' film-card__controls-item--active' : '';
  return `<button class="film-card__controls-item ${style}${activatedStyle}" type="button">${text}</button>`;
};

const createFilmCardTemplate = ({ comments, filmInfo, userDetails }) => {
  const { title, totalRating, poster, release, runtime, genre, description } = filmInfo;
  const { watchlist, alreadyWatched, favorite } = userDetails;
  return `<article class="film-card">
          <a class="film-card__link">
            ${createTitle(title)}
            ${createRating(totalRating)}
            <p class="film-card__info">
              ${createYear(release)}
              ${createDuration(runtime)}
              ${createGenre(genre)}
            </p>
            ${createPoster(poster)}
            ${createDescription(description)}
            ${createCountComments(comments)}
          </a>
          <div class="film-card__controls">
          ${createButton('film-card__controls-item--add-to-watchlist', 'Add to watchlist', watchlist)}
          ${createButton('film-card__controls-item--mark-as-watched', 'Mark as watched', alreadyWatched)}
          ${createButton('film-card__controls-item--favorite', 'Mark as favorite', favorite)}
          </div>
        </article>`;
};

export default class FilmCardView extends AbstractView {
  #movie;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createFilmCardTemplate(this.#movie);
  }

  // Открытие попапа

  setLinkClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#linkClickHandler);
  };

  #linkClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  // Переключить watchlist

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  // Переключить watched

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  // Переключить favorite

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
