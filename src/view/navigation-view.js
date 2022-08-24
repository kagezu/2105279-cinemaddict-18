import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = ({ name, text, count }, isActive) => `
<a href="#${name}" class="main-navigation__item 
${isActive ? ' main-navigation__item--active' : ''}">
${text}
 <span class="main-navigation__item-count">${count}</span></a>`;

const createNavigationTemplate = (filters) => {
  const filterItemsTemplate = filters
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');
  return `<nav class="main-navigation">
  ${filterItemsTemplate}
  </nav>`;
};

export default class NavigationView extends AbstractView {
  #filters;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createNavigationTemplate(this.#filters);
  }
}
