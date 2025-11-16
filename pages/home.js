class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="home-page" id="home-page">
        <h2 class="popular-title">Os mais populares</h2>
        <div class="popular-container">
          <div class="popular-details"></div>
          <div class="popular-counter"></div>
        </div>
        
        <h2 class="more-title">Mais para explorar</h2>

        <h2 class="categories-title">Categorias</h2>
        <div class="categories-container"></div>

        <h2 class="extras-title">Extras</h2>
        <div class="cards-container-home"></div>
      </div>
    `
  }
}
customElements.define("home-page", HomePage);