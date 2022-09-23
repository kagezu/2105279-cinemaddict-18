import AbstractView from '../framework/view/abstract-view.js';

const createProfileTemplate = (count) => `<p>${count} movies inside</p>`;

export default class StatisticView extends AbstractView {
  #count;

  constructor(count) {
    super();
    this.#count = count;
  }

  get template() {
    return createProfileTemplate(this.#count);
  }
}
