import { Config } from "./config.js";
import { mergeAndSort } from "./mergeAndSort.js";
import { renderCards } from "./renderCards.js";
import { Genres } from "./genres.js";
import { getSearchId } from "./searchById.js";
import { renderICardsDetails } from "./renderICardsDetails.js";

function _attachEvents(container) {
  const cards = container.querySelectorAll("card-component");

  cards.forEach((card) => {
    card.addEventListener("click", async () => {
      const id = card.getAttribute("id");
      const type = card.getAttribute("media_type");
      const searchPage = document.querySelector("search-page");
      const globalBackButton = document.getElementById("global-back-button");
      const mainPages = document.querySelectorAll(
        "main > *:not(loading-spinner):not(side-bar)"
      );

      mainPages.forEach((page) => (page.style.display = "none"));

      searchPage.style.display = "flex";

      if (globalBackButton) {
        globalBackButton.style.display = "inline-flex";
      }

      const detailsContainer = searchPage.querySelector(
        ".cards-details-container"
      );

      if (detailsContainer) {
        detailsContainer.innerHTML =
          '<loading-spinner style="display: block; margin: 40px auto;"></loading-spinner>';
        const data = await getSearchId(id, type);
        renderICardsDetails(detailsContainer, data);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

export const LoadContent = {
  async loadMovies(page) {
    try {
      const res = await fetch(
        `${Config.API_HOST}/discover/movie?language=pt-BR&sort_by=primary_release_date.desc&page=${page}&include_adult=${Config.INCLUDE_ADULT}`,
        {
          headers: { Authorization: `Bearer ${Config.TOKEN}` },
        }
      ).then((res) => res.json());

      const movies = res.results.map((m) => ({ ...m, media_type: "movie" }));

      const moviesContainer = document.querySelector(".movies-page-container");
      renderCards(moviesContainer, movies);
      _attachEvents(moviesContainer);
    } catch (err) {
      const errorAlert = document.querySelector("error-alert");
      errorAlert.style.display = "block";

      setTimeout(() => {
        errorAlert.style.display = "none";
      }, 5000);
    }
  },

  async loadTvSeries(page) {
    try {
      const res = await fetch(
        `${Config.API_HOST}/discover/tv?language=pt-BR&sort_by=primary_release_date.desc&page=${page}&include_adult=${Config.INCLUDE_ADULT}`,
        {
          headers: { Authorization: `Bearer ${Config.TOKEN}` },
        }
      ).then((res) => res.json());

      const tvSeries = res.results.map((s) => ({ ...s, media_type: "tv" }));

      const tvSeriesContainer = document.querySelector(
        ".tv-series-page-container"
      );
      renderCards(tvSeriesContainer, tvSeries);
      _attachEvents(tvSeriesContainer);
    } catch (err) {
      const errorAlert = document.querySelector("error-alert");
      errorAlert.style.display = "block";

      setTimeout(() => {
        errorAlert.style.display = "none";
      }, 5000);
    }
  },

  async loadReleases(page) {
    try {
      const moviesRes = await fetch(
        `${Config.API_HOST}/discover/movie?language=pt-BR&sort_by=primary_release_date.desc&include_adult=${Config.INCLUDE_ADULT}&page=${page}`,
        {
          headers: { Authorization: `Bearer ${Config.TOKEN}` },
        }
      ).then((res) => res.json());

      const tvRes = await fetch(
        `${Config.API_HOST}/discover/tv?language=pt-BR&sort_by=first_air_date.desc&include_adult=${Config.INCLUDE_ADULT}&page=${page}`,
        {
          headers: { Authorization: `Bearer ${Config.TOKEN}` },
        }
      ).then((res) => res.json());

      const movies = moviesRes.results.map((m) => ({
        ...m,
        media_type: "movie",
      }));
      const tvs = tvRes.results.map((s) => ({ ...s, media_type: "tv" }));

      const allContent = mergeAndSort(movies, tvs);

      const releasesContainer = document.querySelector(
        ".releases-page-container"
      );
      renderCards(releasesContainer, allContent);
      _attachEvents(releasesContainer);
    } catch (err) {
      const errorAlert = document.querySelector("error-alert");
      errorAlert.style.display = "block";

      setTimeout(() => {
        errorAlert.style.display = "none";
      }, 5000);
    }
  },

  async loadPopulars(page) {
    try {
      const res = await fetch(
        `${Config.API_HOST}/movie/popular?language=pt-BR&include_adult=${Config.INCLUDE_ADULT}&page=${page}`,
        {
          headers: { Authorization: `Bearer ${Config.TOKEN}` },
        }
      ).then((res) => res.json());

      const populars = res.results.map((m) => ({ ...m, media_type: "movie" }));

      const popularsContainer = document.querySelector(
        ".populars-page-container"
      );
      renderCards(popularsContainer, populars);
      _attachEvents(popularsContainer);
    } catch (err) {
      const errorAlert = document.querySelector("error-alert");
      errorAlert.style.display = "block";

      setTimeout(() => {
        errorAlert.style.display = "none";
      }, 5000);
    }
  },

  async loadBestRating(page) {
    try {
      const res = await fetch(
        `${Config.API_HOST}/discover/tv?language=pt-BR&sort_by=vote_average.desc&vote_count.gte=200&page=${page}&include_adult=${Config.INCLUDE_ADULT}`,
        {
          headers: { Authorization: `Bearer ${Config.TOKEN}` },
        }
      ).then((res) => res.json());

      const bests = res.results.map((s) => ({ ...s, media_type: "tv" }));

      const bestsContainer = document.querySelector(".bests-page-container");
      renderCards(bestsContainer, bests);
      _attachEvents(bestsContainer);
    } catch (err) {
      const errorAlert = document.querySelector("error-alert");
      errorAlert.style.display = "block";

      setTimeout(() => {
        errorAlert.style.display = "none";
      }, 5000);
    }
  },

  async loadMoviesByCategory(categoryName, page) {
    try {
      const res = await fetch(
        `${Config.API_HOST}/discover/movie?with_genres=${Genres.movies[categoryName]}&language=pt-BR&page=${page}&include_adult=${Config.INCLUDE_ADULT}`,
        {
          headers: { Authorization: `Bearer ${Config.TOKEN}` },
        }
      ).then((res) => res.json());

      const byCategory = res.results.map((m) => ({
        ...m,
        media_type: "movie",
      }));

      const title = document.querySelector(".category-title");
      title.textContent = `${categoryName.replace(/-/g, " ")} movies`;
      title.style.textTransform = "capitalize";

      const byCategoryContainer = document.querySelector(".movies-container");
      renderCards(byCategoryContainer, byCategory);
      _attachEvents(byCategoryContainer);
    } catch (err) {
      const errorAlert = document.querySelector("error-alert");
      errorAlert.style.display = "block";

      setTimeout(() => {
        errorAlert.style.display = "none";
      }, 5000);
    }
  },
};
