import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortButton = (sortType, isActive) => `
<li>
  <a href="#" class="sort__button ${isActive ? 'sort__button--active' : ''}"
    data-sort-type="${sortType}">
    Sort by ${sortType}
  </a>
</li>`;

const createSortTemplate = (sortType) => {
  const buttons = Object.values(SortType)
    .map((type) => createSortButton(type, type === sortType))
    .join('');
  return `<ul class="sort">${buttons}</ul>`;
};

export default class SortView extends AbstractView {
  #sortType;

  constructor(sortType) {
    super();
    this.#sortType = sortType;
  }

  get template() {
    return createSortTemplate(this.#sortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
