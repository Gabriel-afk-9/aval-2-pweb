import { Config } from "./config.js";
import { mergeAndSort } from "./mergeAndSort.js";
import { renderCards } from "./renderCards.js";
import { Genres } from "./genres.js";

export const LoadContent = {
  async loadMovies(page) {
    const res = await fetch(`${Config.API_HOST}/discover/movie?language=pt-BR&sort_by=primary_release_date.desc&page=${page}&include_adult=${Config.INCLUDE_ADULT}`, {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`
      }
    }).then(res => res.json());

    const movies = res.results;

    const moviesContainer = document.querySelector(".movies-page-container");
    renderCards(moviesContainer, movies);
  },

  async loadTvSeries(page) {
    const res = await fetch(`${Config.API_HOST}/discover/tv?language=pt-BR&sort_by=primary_release_date.desc&page=${page}&include_adult=${Config.INCLUDE_ADULT}`, {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`
      }
    }).then(res => res.json());

    const tvSeries = res.results;

    const tvSeriesContainer = document.querySelector(".tv-series-page-container");
    renderCards(tvSeriesContainer, tvSeries);
  },

  async loadReleases(page) {
    const moviesRes = await fetch(`${Config.API_HOST}/discover/movie?language=pt-BR&sort_by=primary_release_date.desc&include_adult=${Config.INCLUDE_ADULT}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`
      }
    }).then(res => res.json());

    const tvRes = await fetch(`${Config.API_HOST}/discover/tv?language=pt-BR&sort_by=first_air_date.desc&include_adult=${Config.INCLUDE_ADULT}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`
      }
    }).then(res => res.json());

    const allContent = mergeAndSort(moviesRes.results, tvRes.results);

    const releasesContainer = document.querySelector(".releases-page-container");
    renderCards(releasesContainer, allContent);
  },

  async loadPopulars(page) {
    const res = await fetch(`${Config.API_HOST}/movie/popular?language=pt-BR&include_adult=${Config.INCLUDE_ADULT}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`
      }
    }).then(res => res.json());

    const populars = res.results;

    const popularsContainer = document.querySelector(".populars-page-container");
    renderCards(popularsContainer, populars);
  },

  async loadBestRating(page) {
    const res = await fetch(`${Config.API_HOST}/discover/tv?language=pt-BR&sort_by=primary_release_date.desc&page=${page}&include_adult=${Config.INCLUDE_ADULT}`, {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`
      }
    }).then(res => res.json());

    const bests = res.results;

    const bestsContainer = document.querySelector(".bests-page-container");
    renderCards(bestsContainer, bests);
  },

  async loadMoviesByCategory(categoryName, page) {
    const res = await fetch(`${Config.API_HOST}/discover/movie?with_genres=${Genres.movies[categoryName]}&language=pt-BR&page=${page}&include_adult=${Config.INCLUDE_ADULT}`, {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`
      }
    }).then(res => res.json());

    const byCategory = res.results;

    const title = document.querySelector(".category-title");
    title.textContent = `${categoryName} movies`;

    const byCategoryContainer = document.querySelector(".movies-container");
    renderCards(byCategoryContainer, byCategory);
  },
}