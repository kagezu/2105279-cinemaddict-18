import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import { render, remove, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';

const siteBodyElement = document.body;

const isOpenPopap = () => Boolean(siteBodyElement.querySelector('.film-details'));

export default class FilmCardPresenter {
  #container;
  #movie;
  #comments;
  #detailsComponent = null;
  #cardComponent = null;
  #isNewDetails;

  constructor(container, comments) {
    this.#container = container;
    this.#comments = comments;
  }

  init = (movie) => {
    this.#movie = movie;
    this.#isNewDetails = true;
    const prevCardComponent = this.#cardComponent;
    this.#cardComponent = new FilmCardView(movie);
    this.#cardComponent.setLinkClickHandler(this.#viewDetailsComponent);

    if (prevCardComponent === null) {
      render(this.#cardComponent, this.#container);
    }

    if (this.this.#container.contains(prevCardComponent.element)) {
      replace(this.#cardComponent, prevCardComponent);
    }
  };

  destroy = () => {
    remove(this.#cardComponent);
    remove(this.#detailsComponent);
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
    if (isOpenPopap()) {
      return;
    }
    if (!this.#detailsComponent || this.#isNewDetails) {
      this.#isNewDetails = false;
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
