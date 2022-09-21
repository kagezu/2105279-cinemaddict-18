import AbstractView from '../framework/view/abstract-view.js';

const createFilmListExtraTemplate = (title) => `
<section class="films-list films-list--extra">
  <h2 class="films-list__title">${title}</h2>
</section>`;

export default class FilmListExtraView extends AbstractView {
  #title;
  constructor(title) {
    super();
    this.#title = title;
  }

  get template() {
    return createFilmListExtraTemplate(this.#title);
  }
}
