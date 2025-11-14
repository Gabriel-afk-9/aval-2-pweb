
class CardDetails extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title");
    const poster = this.getAttribute("poster");
    const genres = this.getAttribute("genres")
    const rate = this.getAttribute("rate");
    const release = this.getAttribute("release");
    const overview = this.getAttribute('overview');
    // const seasons = this.getAttribute("seasons")

    this.innerHTML = `
      <div class=".card-detail">
        <img src="${poster}" alt="${title}" class="card-img"/>
        <div class="card-detail-body">
          <h3 class="card-detail-title">${title}</h3>
          <p class="card-detail-release">Lançamento: ${release}</p>
          <p>${overview}</p>
          <p id="genrers"><p>
          
          <p class="card-detail-rate">Avaliação: ${rate}</p>
        </div>
      </div>
    `;
    const genresParagra = document.getElementById('genrers')
    
    const newGenrer = [genres]
    newGenrer.forEach(element => {
      const genre = document.createElement("p");
      genre.textContent = element
      genresParagra.appendChild(genre)
    })
  }
}
customElements.define("card-details-component", CardDetails);