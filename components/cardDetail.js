
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
        <h3 class="card-detail-title">${title}</h3>
        
        <div class="card-detail-body">
            <img src="${poster}" alt="${title}" class="card-detail-img"/>
            <div class="card-detail-main-info">
            <p class="card-detail-release"><strong>Lançamento: </strong>${release}</p>
            <p class="card-detail-overview"><strong>Sinopse: </strong>${overview}</p>
            <div id="genrers" class="card-details-genres"></div>          
            <p class="card-detail-rate" class="class-detail-avaliation"><strong>Avaliação⭐: </strong>${rate}</p>
            </div>

        </div>
        <div id="seasons" class="class-detail-seasons"><div>
      </div>
    `;
    const genresParagra = document.getElementById('genrers')
    const seasonsParagra = document.getElementById('seasons')
    const genresArray = genres ? genres.split(',') : [];
    const seasonsArray = seasons ? seasons.split(',') : [];
    const episodesArray = episodes ? episodes.split(',') : [];

    genresArray.forEach(element => {
      if (genresArray.length > 0) {
        const genre = document.createElement("div");
        const genreName = document.createElement("p")
        genreName.textContent = element
        genre.appendChild(genreName)
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

        seasonsName.textContent = `Temporada ${add + 1}  🠲`
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

    seasonsParagra.firstChild.hidden = true;

  }
}
customElements.define("card-details-component", CardDetails);
