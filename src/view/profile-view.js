import AbstractView from '../framework/view/abstract-view.js';

const createProfileTemplate = (ranksName) => `
<section class="header__profile profile">
  <p class="profile__rating">${ranksName}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;

export default class ProfileView extends AbstractView {
  #ranksName;

  constructor(ranksName) {
    super();
    this.#ranksName = ranksName;
  }

  get template() {
    return createProfileTemplate(this.#ranksName);
  }
}
