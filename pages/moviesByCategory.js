class MoviesByCategory extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="movies-by-category">
        <h2 class="category-title"></h2>

        <div class="movies-container"></div>
      </div>
    `
  }
}
customElements.define("movies-by-category", MoviesByCategory);