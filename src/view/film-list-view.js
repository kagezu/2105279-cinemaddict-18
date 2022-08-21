import AbstractView from '../framework/view/abstract-view.js';

const createFilmListTemplate = (isEmpty) => {
  const hiddenClass = isEmpty ? '' : ' visually-hidden';
  const message = isEmpty ?
    'There are no movies in our database' :
    'All movies. Upcoming';
  return `<section class="films-list">
      <h2 class="films-list__title${hiddenClass}">${message}</h2>
      </section>`;
};

export default class FilmListView extends AbstractView {
  #isEmpty;

  constructor(isEmpty) {
    super();
    this.#isEmpty = isEmpty;
  }

  get template() {
    return createFilmListTemplate(this.#isEmpty);
  }
}
