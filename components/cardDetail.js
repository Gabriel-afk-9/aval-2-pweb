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
        <div id="seasons" class="class-detail-seasons"></div>
      </div>
    `;

    const genresParagra = document.getElementById('genrers');
    const seasonsParagra = document.getElementById('seasons');
    const genresArray = genres ? genres.split(',') : [];
    const seasonsArray = seasons ? seasons.split(',') : [];
    const episodesArray = episodes ? episodes.split(',') : [];

    if (genresArray.length > 0) {
      genresArray.forEach(element => {
        const genre = document.createElement("div");
        const genreName = document.createElement("p");
        genreName.textContent = element;
        genre.appendChild(genreName);
        genresParagra.appendChild(genre);
      });
    }

    if (seasonsArray.length > 0) {
      seasonsArray.forEach((element, index) => {
        const season = document.createElement("div");
        const seasonsName = document.createElement("h4");
        
        seasonsName.textContent = `Temporada ${index + 1}`;
        season.appendChild(seasonsName);

        season.addEventListener('click', () => {
          const nextElement = season.nextElementSibling;
          const isAlreadyOpen = nextElement && nextElement.classList.contains('episodes-list-expanded');

          const allOpenEpisodes = seasonsParagra.querySelectorAll('.episodes-list-expanded');
          allOpenEpisodes.forEach(el => el.remove());

          if (isAlreadyOpen) {
            return; 
          }

          const episodesContainer = document.createElement("div");
          episodesContainer.classList.add('episodes-list-expanded');

          const episodeCount = parseInt(episodesArray[index], 10) || 0;

          if (episodeCount > 0) {
            for (let x = 0; x < episodeCount; x++) {
              const episodeName = document.createElement("p");
              episodeName.textContent = `Episódio ${x + 1}`;
              episodesContainer.appendChild(episodeName);
            }
          } else {
            const noEps = document.createElement("p");
            noEps.textContent = "Nenhum episódio disponível.";
            episodesContainer.appendChild(noEps);
          }

          season.after(episodesContainer);
        });
        seasonsParagra.appendChild(season);
      });
    }
  }
}

customElements.define("card-details-component", CardDetails);