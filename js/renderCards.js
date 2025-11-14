import "../components/card.js";

export function renderCards(container, data) {
  container.innerHTML = "";

  if (!Array.isArray(data)) return;

  data.forEach(item => {
    const card = document.createElement("card-component");
    
    const id = item.id
    const media_type = item.media_type
    const title = item.title || item.name || "Título indisponível";
    const poster = item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : "assets/no-image.png";
    const release = item.release_date || item.first_air_date || "—";
    
    const rawRate = item.vote_average ?? item.popularity;
    const rate = (typeof rawRate === 'number' && !isNaN(rawRate )) ? (rawRate % 1 === 0 ? rawRate.toFixed(0) : rawRate.toFixed(1)) : "—";


    card.setAttribute("id", id);
    card.setAttribute("media_type", media_type);
    card.setAttribute("title", title);
    card.setAttribute("poster", poster);
    card.setAttribute("release", release);
    card.setAttribute("rate", rate);

    container.appendChild(card);
  });
}
