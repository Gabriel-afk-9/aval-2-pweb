class Card extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title");
    const poster = this.getAttribute("poster");
    const rate = this.getAttribute("rate");
    const release = this.getAttribute("release");

    this.innerHTML = `
      <div class="card">
        <img src="${poster}" alt="${title}" class="card-img"/>
        <div class="card-body">
          <h3 class="card-title">${title}</h3>
          <p class="card-release">Lançamento: ${release}</p>
          <p class="card-rate">Avaliação: ${rate}</p>
        </div>
      </div>
    `;
  }
}
customElements.define("card-component", Card);