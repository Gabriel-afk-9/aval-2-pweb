import { Config } from "./config.js";
import { renderCards } from "./renderCards.js";
import { getSearchId } from "./searchById.js";
import { renderICardsDetails } from "./renderICardsDetails.js";

function getRandomPage(max = 500) {
  return Math.floor(Math.random() * max) + 1;
}

async function getRandomMovies() {
  try {
    const page = getRandomPage();
    const url = `${Config.API_HOST}/discover/movie?language=pt-BR&page=${page}&include_adult=${Config.INCLUDE_ADULT}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`,
      },
    });
    const data = await res.json();

    return data.results.map((item) => ({ ...item, media_type: "movie" }));
  } catch (err) {
    const errorAlert = document.querySelector("error-alert");
    errorAlert.style.display = "block";

    setTimeout(() => {
      errorAlert.style.display = "none";
    }, 5000);
  }
}

async function getRandomTvShows() {
  try {
    const page = getRandomPage();
    const url = `${Config.API_HOST}/discover/tv?language=pt-BR&page=${page}&include_adult=${Config.INCLUDE_ADULT}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`,
      },
    });
    const data = await res.json();

    return data.results.map((item) => ({ ...item, media_type: "tv" }));
  } catch (err) {
    const errorAlert = document.querySelector("error-alert");
    errorAlert.style.display = "block";

    setTimeout(() => {
      errorAlert.style.display = "none";
    }, 5000);
  }
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
