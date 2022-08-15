import { createElement } from '../render.js';

const createTitle = (title) => title ? `<h3 class="film-card__title">${title}</h3>` : '';
const createRating = (rating) => rating ? `<p class="film-card__rating">${rating}</p>` : '';
const createYear = ({ date }) => date ? `<span class="film-card__year">${date}</span>` : '';
const createDuration = (runtime) => runtime ? `<span class="film-card__duration">${runtime}m</span>` : '';
const createGenre = (genres) => genres ? `<span class="film-card__genre">${genres.join(' ')}</span>` : '';
const createPoster = (poster) => poster ? `<img src="${poster}" alt="" class="film-card__poster">` : '';
const createDescription = (description) => description ? `<p class="film-card__description">${description}</p>` : '';
const createCountComments = ({ length }) => {
  const count = length ? `${length} comments` : 'There is no comment';
  return `<span class="film-card__comments">${count}</span>`;
};
const createButton = (style, text, activated) => {
  const activatedStyle = activated ? ' film-card__controls-item--active' : '';
  return `<button class="film-card__controls-item ${style}${activatedStyle}" type="button">${text}</button>`;
};

const createFilmCardTemplate = ({ comments, filmInfo, userDetails }) => {
  const { title, totalRating, poster, release, runtime, genre, description } = filmInfo;
  const { watchList, alreadyWatched, favorite } = userDetails;
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
          ${createButton('film-card__controls-item--add-to-watchlist', 'Add to watchlist', watchList)}
          ${createButton('film-card__controls-item--mark-as-watched', 'Mark as watched', alreadyWatched)}
          ${createButton('film-card__controls-item--favorite', 'Mark as favorite', favorite)}
          </div>
        </article>`;
};

export default class FilmCardView {
  constructor(movie) {
    this.movie = movie;
  }

  getTemplate() {
    return createFilmCardTemplate(this.movie);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}