import '../components/cardDetail.js'

export function renderICardsDetails(container, data) {
  container.innerHTML = "";
  
    const card_details = document.createElement("card-details-component");

    const title = data.original_title || data.name || "Título indisponível";
    const overview = data.overview;
    const poster = data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : "assets/no-image.png";
    const genresOj = data.genres;
    console.log(genresOj)
    const genrersName = genresOj.map(element => element = element.name);
    const seasons = data.seasons;
    const release = data.release_date || data.first_air_date || "—";
    
    const rawRate = data.vote_average ?? data.popularity;
    const rate = (typeof rawRate === 'number' && !isNaN(rawRate )) ? (rawRate % 1 === 0 ? rawRate.toFixed(0) : rawRate.toFixed(1)) : "—";


    card_details.setAttribute("title", title);
    card_details.setAttribute("overview", overview)
    card_details.setAttribute("poster", poster);
    card_details.setAttribute("genres", genrersName)
    card_details.setAttribute("seasons", seasons)
    card_details.setAttribute("release", release);
    card_details.setAttribute("rate", rate);

    container.appendChild(card_details);
  };

