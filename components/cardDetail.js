
class CardDetails extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title");
    const poster = this.getAttribute("poster");
    const genres = this.getAttribute("genres");
    const seasons = this.getAttribute("seasons");
    const episodes = this.getAttribute("episodes");
    const rate = this.getAttribute("rate");
    const release = this.getAttribute("release");
    const overview = this.getAttribute('overview');

    this.innerHTML = `
      <div class="card-detail">
        <img src="${poster}" alt="${title}" class="card-img"/>
        <div class="card-detail-body">
          <h3 class="card-detail-title">${title}</h3>
          <p class="card-detail-release">Lançamento: ${release}</p>
          <p>${overview}</p>
          <p id="genrers"><p>          
          <p class="card-detail-rate">Avaliação: ${rate}</p>
          <div id="seasons"><div>
        </div>
      </div>
    `;
    const genresParagra = document.getElementById('genrers')
    const seasonsParagra = document.getElementById('seasons')
    const genresArray = genres ? genres.split(',') : [];
    const seasonsArray = seasons ? seasons.split(',') : [];
    const episodesArray = episodes ? episodes.split(',') : [];

    genresArray.forEach(element => {
      if (genresArray.length > 0) {
        const genre = document.createElement("p");
        genre.textContent = element
        genresParagra.appendChild(genre)
      }
    })

    let add = 0;

    if (seasonsArray.length > 0) {
      seasonsArray.forEach(element => {
        const season = document.createElement("div");
        const seasonsName = document.createElement("h4")
        season.setAttribute('state', '0')
        season.setAttribute('data-index', add);

        seasonsName.textContent = `Temporada ${add + 1}:`
        season.appendChild(seasonsName)
        seasonsParagra.appendChild(season)

        add++;
      }

      )
    }
    seasonsParagra.childNodes.forEach(element => {
      element.addEventListener('click', () => {
        const state = element.getAttribute('state')
        const dataIndex = element.getAttribute('data-index')
        console.log('entrei')
        if (state == '0') {
          for (let x = 0; x < parseInt(episodesArray[dataIndex], 10); x++) {
            console.log(parseInt(episodesArray[x], 10))
            const episodeName = document.createElement("p")
            episodeName.textContent = `episódio: ${x + 1}`
            element.appendChild(episodeName)
          }
          element.setAttribute('state', '1');
        }
        else {
          const children = Array.from(element.childNodes);
          children.forEach(child => {
            if (child.tagName !== 'H4') {
              element.removeChild(child);
            }
          });
          element.setAttribute('state', '0');
        }

      })
    })

  }
}
customElements.define("card-details-component", CardDetails);
