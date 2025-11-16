import { loadMovies } from "../js/loadMovies.js";

class Movies extends HTMLElement {
  actualPage = 1;

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
      loadMovies(this.actualPage);
      this.updatePageNumber();
    });

    const backButton = this.querySelector(".back-page-button");

    this.actualPage == 1 ? backButton.disabled = true : backButton.disabled = false;

    backButton.addEventListener("click", () => {
      this.actualPage--;
      loadMovies(this.actualPage);
      this.updatePageNumber();
    })
  }

  updatePageNumber() {
    const backButton = this.querySelector(".back-page-button");
    const pageText = this.querySelector(".actual-page");
    pageText.textContent = this.actualPage;
    backButton.disabled = (this.actualPage === 1);
  }
}

customElements.define("movies-page", Movies);