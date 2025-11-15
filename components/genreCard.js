class GenreCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="genre-card"></div>
    `
  }
}