class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="home-page" id="home-page">
        <h2>HOME</h2>
        <div class="cards-container"></div>
      </div>
    `
  }
}
customElements.define("home-page", HomePage);