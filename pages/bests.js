import { LoadContent } from "../js/loadContent.js";

class Bests extends HTMLElement {
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
      <div class="bests-page">
        <h2 class="bests-title">Os Mais Bem Avaliados</h2>

        <div class="bests-page-container"></div>

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
      LoadContent.loadBestRating(this.actualPage);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    const backButton = this.querySelector(".back-page-button");

    backButton.disabled = (this.actualPage === 1);

    backButton.addEventListener("click", () => {
      this.actualPage--;
      LoadContent.loadBestRating(this.actualPage);
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

customElements.define("bests-page", Bests);