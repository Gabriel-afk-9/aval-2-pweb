import { LoadContent } from "../js/loadContent.js";

class MoviesByCategory extends HTMLElement {
  _actualPage = 1;
  genreName = null;

  set actualPage(value) {
    this._actualPage = value;
    this.updatePageNumber();
  }

  get actualPage() {
    return this._actualPage;
  }

  static get observedAttributes() {
    return ["genre-name"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "genre-name") {
      this.genreName = newValue;

      this.actualPage = 1;
      LoadContent.loadMoviesByCategory(this.genreName, this.actualPage);
      this.updatePageNumber();
    }
  }

  connectedCallback() {
    this.render();
    this.addEvents();
  }

  render() {
    this.innerHTML = `
      <div class="movies-by-category">
        <h2 class="category-title"></h2>

        <div class="movies-container"></div>

        <div class="page-informations-container">
          <button class="back-page-button">Anterior</button>
          <p class="actual-page">${this.actualPage}</p>
          <button class="next-page-button">Próxima</button>
        </div>
      </div>
    `;
  }

  addEvents() {
    const nextButton = this.querySelector(".next-page-button");
    const backButton = this.querySelector(".back-page-button");

    nextButton.addEventListener("click", () => {
      this.actualPage++;
      LoadContent.loadMoviesByCategory(this.genreName, this.actualPage);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    backButton.addEventListener("click", () => {
      this.actualPage--;
      LoadContent.loadMoviesByCategory(this.genreName, this.actualPage);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  updatePageNumber() {
    const pageText = this.querySelector(".actual-page");
    const backButton = this.querySelector(".back-page-button");

    pageText.textContent = this.actualPage;
    backButton.disabled = (this.actualPage === 1);
  }
}

customElements.define("movies-by-category-page", MoviesByCategory);