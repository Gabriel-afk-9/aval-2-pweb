import '../components/cardDetail.js'

export function renderICardsDetails(container, data) {
  container.innerHTML = "";

    const backButton = document.createElement("button");
  backButton.id = "details-back-button";
  backButton.className = "btn-back-details";
  backButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
    Voltar
  `;
  container.appendChild(backButton);
  
    const card_details = document.createElement("card-details-component");

    const title = data.original_title || data.name || "Título indisponível";
    const overview = data.overview || "Sinopse indisponível"
    const poster = data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : "../assets/image-not-found.png";
    const genresObj = data.genres || [];
    console.log(genresObj)
    const genrersName = genresObj.map(element => element = element.name);
    const seasonsObj = data.seasons || [];
    const seasonsName = seasonsObj.map(element => element = element.name)
    const episodes = seasonsObj.map(element => element = element.episode_count) || []
    const release = data.release_date || data.first_air_date || "—";
    
    const rawRate = data.vote_average ?? data.popularity;
    const rate = (typeof rawRate === 'number' && !isNaN(rawRate )) ? (rawRate % 1 === 0 ? rawRate.toFixed(0) : rawRate.toFixed(1)) : "—";


    card_details.setAttribute("title", title);
    card_details.setAttribute("overview", overview);
    card_details.setAttribute("poster", poster);
    card_details.setAttribute("genres", genrersName);
    card_details.setAttribute("seasons", seasonsName);
    card_details.setAttribute("episodes", episodes);
    card_details.setAttribute("release", release);
    card_details.setAttribute("rate", rate);

    container.appendChild(card_details);
  };
