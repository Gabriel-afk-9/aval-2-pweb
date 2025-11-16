class SideBar extends HTMLElement {
  isOpen = false;

  connectedCallback() {
    this.innerHTML = `
      <div class="side-bar">
        <button id="go-to-movies">Filmes</button>
        <button id="go-to-tv">Séries</button>
        <button id="go-to-news">Lançamentos</button>
        <button id="go-to-bests">Mais Populares</button>
        <button id="go-to-ratings">Top Avaliados</button>
      </div>
    `;

    this.sideBar = this.querySelector(".side-bar");
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.sideBar.classList.toggle("open", this.isOpen);
  }
}

customElements.define("side-bar", SideBar);