import SortView from '../view/sort-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsView from '../view/films-view.js';
import FilmListContainerView from '../view/film-list-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmDetailsView from '../view/film-details-view.js';
import { render, remove } from '../framework/render.js';

const CARD_COUNT_PER_STEP = 5;
const ESCAPE_KEY_NAME = 'Escape';

const isEscapeKey = (evt) => evt.key === ESCAPE_KEY_NAME;
const siteBodyElement = document.body;

export default class FilmsPresenter {
  #filmsContainer = new FilmsView();
  #filmListContainer = new FilmListContainerView();
  #showMoreButton = new ShowMoreButtonView();
  #filmList;
  #container;
  #movies;
  #comments;
  #renderedCardCount = 0;

  init = (container, movies, comments) => {
    this.#container = container;
    this.#movies = movies;
    this.#comments = comments;
    this.#filmList = new FilmListView(!movies.length);

    render(new SortView(), this.#container);
    render(this.#filmsContainer, this.#container);
    render(this.#filmList, this.#filmsContainer.element);
    render(this.#filmListContainer, this.#filmList.element);
    render(this.#showMoreButton, this.#filmList.element);

    this.#showMoreButton.setClickHandler(this.#onLoadMoreCardClick);
    this.#onLoadMoreCardClick();
  };

  #onLoadMoreCardClick = () => {
    const lastComponent = Math.min(this.#renderedCardCount + CARD_COUNT_PER_STEP, this.#movies.length);
    while (this.#renderedCardCount < lastComponent) {
      this.#renderCard(this.#movies[this.#renderedCardCount], this.#comments);
      this.#renderedCardCount++;
    }
    if (this.#renderedCardCount === this.#movies.length) {
      remove(this.#showMoreButton);
    }
  };

  #renderCard = (movie, comments) => {
    const cardComponent = new FilmCardView(movie);
    let detailsComponent = null;

    const hideDetailsComponent = () => {
      remove(detailsComponent);
      siteBodyElement.classList.remove('hide-overflow');
    };

    const onWindowKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        hideDetailsComponent();
        window.removeEventListener('keydown', onWindowKeydown);
      }
    };

    const viewDetailsComponent = () => {
      if (siteBodyElement.querySelector('.film-details')) {
        return;
      }
      if (!detailsComponent) {
        detailsComponent = new FilmDetailsView(movie, comments);
        detailsComponent.setCloseButtonClickHandler(() => {
          hideDetailsComponent();
          window.removeEventListener('keydown', onWindowKeydown);
        });
      }
      siteBodyElement.classList.add('hide-overflow');
      render(detailsComponent, siteBodyElement);
      window.addEventListener('keydown', onWindowKeydown);
    };

    cardComponent.setLinkClickHandler(viewDetailsComponent);
    render(cardComponent, this.#filmListContainer.element);
  };
}
