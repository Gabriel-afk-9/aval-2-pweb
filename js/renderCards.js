import "../components/card.js";

export function renderCards(container, data) {
  container.innerHTML = "";

  if (!Array.isArray(data)) return;

  data.forEach(item => {
    if (!(item.title || item.name) && !item.poster_path && !item.vote_average) return;

    const card = document.createElement("card-component");

    const title = item.title || item.name || "Título indisponível";
    const poster = item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : "../assets/image-not-found.png";
    const release = item.release_date || item.first_air_date || "—";
    
    const rawRate = item.vote_average ?? item.popularity;
    const rate = (typeof rawRate === 'number' && !isNaN(rawRate )) ? (rawRate % 1 === 0 ? rawRate.toFixed(0) : rawRate.toFixed(1)) : "—";

    card.setAttribute("title", title);
    card.setAttribute("poster", poster);
    card.setAttribute("release", release);
    card.setAttribute("rate", rate);

    container.appendChild(card);
  });
}
