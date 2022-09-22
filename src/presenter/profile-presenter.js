import { render, replace, remove } from '../framework/render.js';
import ProfileView from '../view/profile-view.js';
import { UpdateType } from '../const.js';

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

    this.#profileComponent = new ProfileView('movie buff');

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
