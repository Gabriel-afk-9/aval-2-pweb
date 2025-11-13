import { Config } from "./config.js";
import { search } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search");
  const panel = document.getElementById("panel");

  function createMovieCard(movie) {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const poster = document.createElement("img");
    poster.classList.add("movie-poster");
    poster.src = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "assets/no-image.png";
    poster.alt = movie.title || movie.name;

    const info = document.createElement("div");
    info.classList.add("movie-info");

    const title = document.createElement("h2");
    title.textContent = movie.title || movie.name;

    const date = document.createElement("p");
    date.textContent = movie.release_date
      ? `Lançamento: ${movie.release_date}`
      : movie.first_air_date
      ? `Lançamento: ${movie.first_air_date}`
      : "Sem data disponível";

    const rating = document.createElement("span");
    rating.classList.add("movie-rating");
    rating.textContent = movie.vote_average
      ? `⭐ ${movie.vote_average.toFixed(1)}`
      : "⭐ -";

    info.appendChild(title);
    info.appendChild(date);
    info.appendChild(rating);
    card.appendChild(poster);
    card.appendChild(info);

    return card;
  }

  function showResults(results) {
    panel.innerHTML = "";
    if (!results || results.length === 0) {
      panel.innerHTML = "<p class='no-results'>Nenhum resultado encontrado.</p>";
      return;
    }

    results.forEach((movie) => {
      const card = createMovieCard(movie);
      panel.appendChild(card);
    });
  }

  searchInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (!query) return;
      panel.innerHTML = "<p class='loading'>Carregando...</p>";

      try {
        const result = await search(query, "movie");
        showResults(result.results);
      } catch (err) {
        console.error(err);
        panel.innerHTML = "<p class='error'>Erro ao buscar filmes</p>";
      }
    }
  });
});
