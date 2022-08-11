import SortView from '../view/sort-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsView from '../view/films-view.js';
import FilmListContainerView from '../view/film-list-container.js';
import NavigationView from '../view/navigation-view.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import { render } from '../render.js';

const COUNT_FILM_CARD = 5;

export default class FilmPresenter {
  filmsContainer = new FilmsView();
  filmList = new FilmListView();
  filmListContainer = new FilmListContainerView();

  init = (container) => {
    this.container = container;

    render(new NavigationView(), this.container);
    render(new SortView(), this.container);
    render(this.filmsContainer, this.container);
    render(this.filmList, this.filmsContainer.getElement());
    render(this.filmListContainer, this.filmList.getElement());

    for (let i = 0; i < COUNT_FILM_CARD; i++) {
      render(new FilmCardView(), this.filmListContainer.getElement());
    }

    render(new ShowMoreButtonView(), this.filmList.getElement());
  };
}
