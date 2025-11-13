import "../components/card.js";

export function renderCards(container, data) {
  container.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("card-component");
    card.setAttribute("title", item.title || item.name);
    card.setAttribute("poster", `https://image.tmdb.org/t/p/w500${item.poster_path}`);
    card.setAttribute("release", item.release_date || item.first_air_date);
    card.setAttribute("rate", item.popularity);
    container.appendChild(card);
  });

  console.log(container);
}