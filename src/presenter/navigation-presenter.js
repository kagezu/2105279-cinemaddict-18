import { render, replace, remove } from '../framework/render.js';
import NavigationView from '../view/navigation-view.js';
import { filter } from '../utils/filter.js';
import { UpdateType, filterTypeToText } from '../const.js';

export default class NavigationPresenter {
  #filterContainer = null;
  #filterModel = null;
  #movieModel = null;

  #navigationComponent = null;

  constructor(filterContainer, filterModel, movieModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#movieModel = movieModel;

    this.#movieModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const movies = this.#movieModel.movies;

    return Object.entries(filter)
      .map(
        ([name, filterMovies]) => ({
          name,
          text: filterTypeToText[name],
          count: filterMovies(movies).length,
        })
      );
  }

  init = () => {
    const filters = this.filters;
    const prevNavigationComponent = this.#navigationComponent;

    this.#navigationComponent = new NavigationView(filters, this.#filterModel.filter);
    this.#navigationComponent.setFilterTypeClickHandler(this.#handleFilterTypeChange);

    if (prevNavigationComponent === null) {
      render(this.#navigationComponent, this.#filterContainer);
      return;
    }

    replace(this.#navigationComponent, prevNavigationComponent);
    remove(prevNavigationComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
