import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoMovieTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no history movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

const createFilmListTemplate = (filterType, isEmpty) => {
  const hiddenClass = isEmpty ? '' : ' visually-hidden';
  const message = isEmpty ? NoMovieTextType[filterType] : '';
  return `<section class="films-list">
      <h2 class="films-list__title${hiddenClass}">${message}</h2>
      </section>`;
};

export default class FilmListView extends AbstractView {
  #isEmpty;
  #filterType;

  constructor(filterType, isEmpty) {
    super();
    this.#isEmpty = isEmpty;
    this.#filterType = filterType;
  }

  get template() {
    return createFilmListTemplate(this.#filterType, this.#isEmpty);
  }
}
