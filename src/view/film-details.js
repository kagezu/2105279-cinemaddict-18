import { createElement } from '../render.js';
import dayjs from 'dayjs';
import { emotions } from '../mock/comments.js';

const createPoster = (poster) => `<img class="film-details__poster-img" src="${poster}" alt="">`;
const createAgeRating = (age) => age ? `<p class="film-details__age">${age}+</p>` : '';
const createTitle = (title) => title ? `<h3 class="film-details__title">${title}</h3>` : '';
const createOriginalTitle = (title) => title ? `<p class="film-details__title-original">Original: ${title}</p>` : '';
const createTotalRating = (rating) => rating ? ` <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p></div>` : '';
const createDirector = (director) => director ? `
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>` : '';
const createWriters = (writers) => writers.length ? `
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(', ')}</td>
            </tr>` : '';
const createActors = (actors) => actors.length ? `
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(', ')}</td>
            </tr>` : '';
const createRelease = (release) => release ? `
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dayjs(release).format('DD MMMM YYYY')}</td>
            </tr>` : '';
const createRuntime = (runtime) => runtime ? `
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}m</td>
            </tr>` : '';
const createCountry = () => `
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">USA</td>
            </tr>`;
const createGenre = (genre) => `<span class="film-details__genre">${genre}</span>`;
const createGenres = (genres) => {
  const genreString = genres.length ? genres.reduce(createGenre) : '';
  return genreString ? `<tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
               ${genreString}
              </td>
            </tr>` : '';
};
const createDescription = (description) => description ? `<p class="film-details__film-description">${description}</p>` : '';
const createButton = (id, text, activated) => {
  const style = activated ? ' film-details__control-button--active' : '';
  return `<button type="button" class="film-details__control-button film-details__control-button--${id}${style}" id="${id}" name="${id}">${text}</button>`;
};
const createCountComments = (count) => count ? `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${count}</span></h3>` : '';
const createComment = ({ author, comment, date, emotion }) => ` <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${dayjs(date).format('YYYY/MM/DD HH:mm')}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
const createComments = (comments, listComments) => {
  const template = comments.map(
    (index) => createComment(listComments.find(
      ({ id }) => id === index)
    )
  )
    .join('');
  return `<ul class="film-details__comments-list">${template}</ul>`;
};
const createEmojiButton = (emotion) => `
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
            <label class="film-details__emoji-label" for="emoji-${emotion}">
              <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
            </label>`;
const createEmojiButtons = () => emotions.map(createEmojiButton).join('');

const createFilmDetailsTemplate = ({ comments, filmInfo, userDetails }, listComments) => {
  const { title, alternativeTitle, totalRating, poster, ageRating, director, writers, actors, release, runtime, genre, description } = filmInfo;
  const { watchList, alreadyWatched, favorite } = userDetails;
  return `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          ${createPoster(poster)}
          ${createAgeRating(ageRating)}
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              ${createTitle(title)}
              ${createOriginalTitle(alternativeTitle)}
            </div>
            ${createTotalRating(totalRating)}
          </div>

          <table class="film-details__table">
            ${createDirector(director)}
            ${createWriters(writers)}
            ${createActors(actors)}
            ${createRelease(release.date)}
            ${createRuntime(runtime)}
            ${createCountry()}
            ${createGenres(genre)}
          </table>
          
          ${createDescription(description)}
        </div>
      </div>

      <section class="film-details__controls">
      ${createButton('watchlist', 'Add to watchlist', watchList)}
      ${createButton('watched', 'Already watched', alreadyWatched)}
      ${createButton('favorite', 'Add to favorites', favorite)}
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        ${createCountComments(comments.length)}
        ${createComments(comments, listComments)}

        <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
           ${createEmojiButtons()}
          </div>
        </form>
      </section>
    </div>
  </div>
</section>`;
};

export default class FilmDetailsView {

  constructor(movieModel, id) {
    this.movie = movieModel.getMovies()[id];
    this.comments = movieModel.getComments();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this.movie, this.comments);
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
