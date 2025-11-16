import { renderCards } from "./renderCards.js";
import { getSearch } from "./search.js";
import { getSearchId } from "./searchById.js";
import { renderICardsDetails } from "./renderICardsDetails.js";
import "../pages/home.js";
import "../pages/search.js";
import "../pages/moviesByCategory.js";
import "../components/card.js";
import "../components/loadingSpinner.js";
import "../components/sideBar.js";
import "../pages/movies.js";
import { LoadPopular } from "./loadPopular.js";
import { renderCategories } from "./renderCategories.js";
import { loadMovies } from "./loadMovies.js";

let local = "home";

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const loadingSpinner = document.querySelector("loading-spinner");
  loadingSpinner.style.display = "none";

  const search = document.getElementById("search");
  const searchDropdown = document.getElementById("searchDropdown");
  const homePage = document.querySelector("home-page");
  const searchPage = document.querySelector("search-page");
  const moviesByCategory = document.querySelector("movies-by-category");
  const homeButton = document.getElementById("home-button");
  const globalBackButton = document.getElementById("global-back-button");
  const moviesPage = document.querySelector("movies-page");

  moviesPage.style.display = "none";

  searchPage.style.display = "none";
  moviesByCategory.style.display = "none";

  function goToHome() {
    homePage.style.display = "flex";
    searchPage.style.display = "none";
    moviesByCategory.style.display = "none";
    globalBackButton.style.display = "none";
    moviesPage.style.display = "none";

    if (search) search.value = "";
    if (searchDropdown) {
      searchDropdown.innerHTML = "";
      searchDropdown.style.display = "none";
    }
  }

  if (homeButton) {
    homeButton.addEventListener("click", goToHome);
  }

  if (globalBackButton) {
    globalBackButton.addEventListener("click", goToHome);
  }

  if (searchPage) {
    searchPage.addEventListener("click", (e) => {
      if (e.target.closest("#details-back-button")) {
        goToHome();
      }

      if (moviesByCategory) {
        moviesByCategory.addEventListener("click", (e) => {
          if (e.target.closest("#category-back-button")) {
            goToHome();
          }
        });
      }
    });
  }

  const handleSearchInput = async (e) => {
    const value = e.target.value.trim();

    if (value === "") {
      goToHome();
      return;
    }

    searchDropdown.innerHTML = '<li class="dropdown-loading">Buscando...</li>';
    searchDropdown.style.display = "block";

    const result = await getSearch(value, local);
    searchDropdown.innerHTML = "";

    const validResults = result.results.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );

    if (validResults.length === 0) {
      searchDropdown.innerHTML =
        '<li class="dropdown-no-result">Nenhum resultado encontrado.</li>';
      searchDropdown.style.display = "block";
      return;
    }

    validResults.slice(0, 6).forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("dropdown-item");

      const posterUrl = item.poster_path
        ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
        : "./assets/image-not-found.png";

      const title = item.title || item.name || "Título indisponível";
      const year = (item.release_date || item.first_air_date || "").split(
        "-"
      )[0];
      const type = item.media_type === "movie" ? "filme" : "série";

      const rawRate = item.vote_average ?? item.popularity;
      const rate =
        typeof rawRate === "number" && !isNaN(rawRate)
          ? rawRate % 1 === 0
            ? rawRate.toFixed(0)
            : rawRate.toFixed(1)
          : "—";

      li.innerHTML = `
        <img src="${posterUrl}" alt="${title}" class="dropdown-item-poster" />
        <div class="dropdown-item-info">
          <div class="dropdown-item-title">${title}</div>
          <div class="dropdown-item-meta">
            <span class="dropdown-item-type ${item.media_type}">${type}</span>
            ${year ? `<span>${year}</span>` : ""}
            <span class="dropdown-item-rate">⭐ ${rate}</span>
          </div>
        </div>
      `;

      li.addEventListener("click", async () => {
        homePage.style.display = "none";
        searchPage.style.display = "flex";
        moviesByCategory.style.display = "none";
        globalBackButton.style.display = "inline-flex";

        const detailsContainer = searchPage.querySelector(
          ".cards-details-container"
        );

        if (detailsContainer) {
          detailsContainer.innerHTML =
            '<loading-spinner style="display: block; margin: 40px auto;"></loading-spinner>';
        }

        const data = await getSearchId(item.id, item.media_type);

        if (detailsContainer) {
          renderICardsDetails(detailsContainer, data);
        }

        searchDropdown.innerHTML = "";
        searchDropdown.style.display = "none";
        search.value = "";
      });

      searchDropdown.appendChild(li);
    });

    searchDropdown.style.display = "block";
  };

  search.addEventListener("input", debounce(handleSearchInput, 300));

  document.addEventListener("click", (e) => {
    if (search && searchDropdown) {
      if (!search.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.style.display = "none";
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchDropdown) {
      searchDropdown.style.display = "none";
      searchDropdown.innerHTML = "";
    }
  });

  LoadPopular.movies();

  const sideBar = document.querySelector("side-bar");
  const menuButton = document.getElementById("menu-button");
  let isOpen = false;

  menuButton.addEventListener("click", () => {
    isOpen = !isOpen;

    isOpen
      ? menuButton.classList.add("toggled")
      : menuButton.classList.remove("toggled");
    sideBar.toggle();
  });

  const moviesButton = document.querySelector("#go-to-movies");
  moviesButton.addEventListener("click", () => {
    homePage.style.display = "none";
    moviesPage.style.display = "flex";
    loadMovies(1);
    sideBar.toggle();
  });
});

customElements.whenDefined("home-page").then(() => {
  renderCategories();
});
