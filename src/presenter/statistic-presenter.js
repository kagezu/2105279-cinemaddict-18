import { render, replace, remove } from '../framework/render.js';
import StatisticView from '../view/statistic-view.js';
import { UpdateType } from '../const.js';

export default class StatisticPresenter {
  #movieModel = null;
  #statisticComponent = null;
  #container;

  constructor(container, movieModel) {
    this.#container = container;
    this.#movieModel = movieModel;

    this.#movieModel.addObserver(this.#handleModelEvent);
  }

  init = () => {

    const prevStatisticComponent = this.#statisticComponent;
    this.#statisticComponent = new StatisticView(this.#movieModel.movies.length);

    if (prevStatisticComponent === null) {
      render(this.#statisticComponent, this.#container);
      return;
    }

    replace(this.#statisticComponent, prevStatisticComponent);
    remove(prevStatisticComponent);
  };

  #handleModelEvent = (updateType) => {

    switch (updateType) {
      case UpdateType.INIT:
        this.init();
        break;
    }
  };

}
