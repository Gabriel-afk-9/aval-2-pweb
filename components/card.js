class Card extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute("id");
    const media_type = this.getAttribute("media_type");
    this.setAttribute("id", id);
    this.setAttribute("media_type", media_type);
    const title = this.getAttribute("title");
    const poster = this.getAttribute("poster");
    const rate = this.getAttribute("rate");
    const release = this.getAttribute("release");
    const bgColor = this.getAttribute("bgcolor");

    this.innerHTML = `
      <div class="card">
        <img src="${poster}" alt="${title}" class="card-img"/>
        <div class="card-body">
          <h3 class="card-title">${title}</h3>
          <p class="card-release">Lançamento: ${release}</p>
          <p class="card-rate">Avaliação: ${rate} ⭐</p>
          <div class="card-media">
            <p class="media-type">${media_type}</p>
          </div>
        </div>
      </div>
    `;

    const media = this.querySelector(".card-media");
    if (!media) return;

    if (bgColor == "transparent") {
      media.style.display = "none";
      return;
    }

    media.style.backgroundColor = bgColor;
  }
}
customElements.define("card-component", Card);