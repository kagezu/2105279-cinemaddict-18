import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = ({ name, text, count }, isActive) => `
<a href="#${name}" class="main-navigation__item 
${isActive ? ' main-navigation__item--active' : ''}"
data-filter-type="${name}">
${text}
 <span class="main-navigation__item-count">${count}</span></a>`;

const createNavigationTemplate = (filters, currentFilterType) => {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, filter.name === currentFilterType))
    .join('');
  return `<nav class="main-navigation">
  ${filterItemsTemplate}
  </nav>`;
};

export default class NavigationView extends AbstractView {
  #filters;
  #currentFilterType;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createNavigationTemplate(this.#filters, this.#currentFilterType);
  }

  /**Установка обработчика выбора фильтра*/
  setFilterTypeClickHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  /**Обработчик выбора фильтра*/
  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    const filterType = evt.target.dataset.filterType;
    if (filterType !== this.#currentFilterType) {
      this._callback.filterTypeChange(filterType);
    }
  };
}
