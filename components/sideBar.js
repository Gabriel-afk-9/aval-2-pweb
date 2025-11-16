class SideBar extends HTMLElement {
  isOpen = false;

  connectedCallback() {
    this.innerHTML = `
      <div class="side-bar">
        <button id="go-to-movies">Filmes</button>
        <button id="go-to-tv">Séries</button>
        <button id="go-to-releases">Lançamentos</button>
        <button id="go-to-populars">Mais Populares</button>
        <button id="go-to-bests">Top Avaliados</button>
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