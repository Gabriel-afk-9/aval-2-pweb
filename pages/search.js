class SearchPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="search-page" id="search-page">
        <h2>SEARCH</h2>
        <div class="cards-container"></div>
      </div>
    `
  }
}
customElements.define("search-page", SearchPage);