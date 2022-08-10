import { createElement } from '../render.js';

const createFilmListContainerTemplate = () => ('<div class="films-list__container"></div>');

export default class FilmListContainerView {

  getTemplate() {
    return createFilmListContainerTemplate();
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
