import { createElement } from '../render.js';

const createFilmListTemplate = (isEmpty) => {
  const hiddenClass = isEmpty ? '' : ' visually-hidden';
  const message = isEmpty ?
    'There are no movies in our database' :
    'All movies. Upcoming';
  return `<section class="films-list">
      <h2 class="films-list__title${hiddenClass}">${message}</h2>
      </section>`;
};

export default class FilmListView {
  #element;
  #isEmpty;

  constructor(isEmpty) {
    this.#isEmpty = isEmpty;
  }

  getTemplate() {
    return createFilmListTemplate(this.#isEmpty);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate());
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
