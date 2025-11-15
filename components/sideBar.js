class SideBar extends HTMLElement {
  isOpen = false;

  connectedCallback() {
    this.innerHTML = `
      <div class="side-bar">
        <button>Filmes</button>
        <button>Séries</button>
        <button>Categorias</button>
        <button>Lançamentos</button>
        <button>Mais Populares</button>
        <button>Top Avaliados</button>
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