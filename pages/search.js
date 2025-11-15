class SearchPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="search-page" id="search-page">
        <div class="cards-container"></div>
        <div class="cards-details-container"></div>
      </div>
    `
  }
}
customElements.define("search-page", SearchPage);