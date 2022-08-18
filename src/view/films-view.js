import { createElement } from '../render.js';

const createFilmsTemplate = () => ('<section class="films"></section>');

export default class FilmsView {
  #element;

  getTemplate() {
    return createFilmsTemplate();
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
