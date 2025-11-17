import { LoadContent } from "../js/loadContent.js";

class MoviesPage extends HTMLElement {
  _actualPage = 1;

  set actualPage(value) {
    this._actualPage = value;
    this.updatePageNumber();
  }

  get actualPage() {
    return this._actualPage;
  }

  connectedCallback() {
    this.render();
    this.addEvents();
  }

  render() {
    this.innerHTML = `
      <div class="movies-page">
        <h2 class="movies-title">Filmes disponíveis</h2>

        <div class="movies-page-container"></div>

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

    nextButton.addEventListener("click", () => {
      this.actualPage++;
      LoadContent.loadMovies(this.actualPage);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    const backButton = this.querySelector(".back-page-button");

    backButton.disabled = (this.actualPage === 1);

    backButton.addEventListener("click", () => {
      this.actualPage--;
      LoadContent.loadMovies(this.actualPage);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  updatePageNumber() {
    const backButton = this.querySelector(".back-page-button");
    const pageText = this.querySelector(".actual-page");
    pageText.textContent = this.actualPage;
    backButton.disabled = (this.actualPage === 1);
  }
}

customElements.define("movies-page", MoviesPage);