class MoviesByCategory extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="movies-by-category">
      
        <button id="category-back-button" class="btn-back-details">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          Voltar
        </button>
        <h2 class="category-title"></h2>
        <div class="movies-container"></div>
      </div>
    `
  }
}
customElements.define("movies-by-category", MoviesByCategory);