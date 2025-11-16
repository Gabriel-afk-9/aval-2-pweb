import { Config } from "./config.js";
import { renderCards } from "./renderCards.js";

function getRandomPage(max = 500) {
  return Math.floor(Math.random() * max) + 1;
}

async function getRandomMovies() {
  const page = getRandomPage();
  const url = `${Config.API_HOST}/discover/movie?language=pt-BR&page=${page}&include_adult=${Config.INCLUDE_ADULT}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${Config.TOKEN}`
    }
  });
  const data = await res.json();
  return data.results;
}

async function getRandomTvShows() {
  const page = getRandomPage();
  const url = `${Config.API_HOST}/discover/tv?language=pt-BR&page=${page}&include_adult=${Config.INCLUDE_ADULT}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${Config.TOKEN}`
    }
  });
  const data = await res.json();
  return data.results;
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export async function loadExtras() {
  const movies = await getRandomMovies();
  const series = await getRandomTvShows();

  const combined = shuffleArray([...movies, ...series]);

  return combined.slice(0, 20);
}

export async function getContent(container) {
  const content = await loadExtras();

  renderCards(container, content);
}