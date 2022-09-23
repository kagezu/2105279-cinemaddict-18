import { render, replace, remove } from '../framework/render.js';
import ProfileView from '../view/profile-view.js';
import { filter } from '../utils/filter.js';
import { UpdateType, FilterType, ranks } from '../const.js';

export default class NavigationPresenter {
  #movieModel = null;
  #profileComponent = null;
  #profileContainer;

  constructor(profileContainer, movieModel) {
    this.#profileContainer = profileContainer;
    this.#movieModel = movieModel;

    this.#movieModel.addObserver(this.#handleModelEvent);
  }

  init = () => {

    const prevProfileComponent = this.#profileComponent;

    const countWatched = filter[FilterType.HISTORY](this.#movieModel.movies).length;
    const rankName = ranks.find(({ count }) => count > countWatched).name;
    this.#profileComponent = new ProfileView(rankName);

    if (prevProfileComponent === null) {
      render(this.#profileComponent, this.#profileContainer);
      return;
    }

    replace(this.#profileComponent, prevProfileComponent);
    remove(prevProfileComponent);
  };

  #handleModelEvent = (updateType) => {

    switch (updateType) {

      case UpdateType.INIT:
        this.init();
        break;

      case UpdateType.MINOR:
        this.init();
        break;
    }

  };

}
