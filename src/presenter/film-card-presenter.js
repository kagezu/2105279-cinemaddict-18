import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import { render, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';

const siteBodyElement = document.body;

export default class FilmCardPresenter {
  #container;
  #movie;
  #comments;
  #detailsComponent;
  #cardComponent;

  constructor(container, comments) {
    this.#container = container;
    this.#comments = comments;
  }

  init = (movie) => {
    this.#movie = movie;
    this.#cardComponent = new FilmCardView(movie);
    this.#cardComponent.setLinkClickHandler(this.#viewDetailsComponent);
    render(this.#cardComponent, this.#container);
  };

  #hideDetailsComponent = () => {
    remove(this.#detailsComponent);
    siteBodyElement.classList.remove('hide-overflow');
  };

  #onWindowKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#hideDetailsComponent();
      window.removeEventListener('keydown', this.#onWindowKeydown);
    }
  };

  #viewDetailsComponent = () => {
    if (siteBodyElement.querySelector('.film-details')) {
      return;
    }
    if (!this.#detailsComponent) {
      this.#detailsComponent = new FilmDetailsView(this.#movie, this.#comments);
      this.#detailsComponent.setCloseButtonClickHandler(() => {
        this.#hideDetailsComponent();
        window.removeEventListener('keydown', this.#onWindowKeydown);
      });
    }
    siteBodyElement.classList.add('hide-overflow');
    render(this.#detailsComponent, siteBodyElement);
    window.addEventListener('keydown', this.#onWindowKeydown);
  };
}
