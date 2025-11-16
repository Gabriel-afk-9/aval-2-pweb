import { Config } from "./config.js";
import "../pages/home.js";

export const LoadPopular = {
  async movies() {
    const res = await fetch(`${Config.API_HOST}/movie/popular`, {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`
      }
    }).then(res => res.json());

    const popularMovies = res.results.slice(0, 5);

    const backdropMoviesImages = popularMovies.map(movie => 
      `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    );

    let details = [];
    popularMovies.forEach(movie => {
      const detailsObject = {
        title: movie.title || movie.name,
        sinopse: movie.overview
      }

      details.push(detailsObject);
    });

    startCarrousel(backdropMoviesImages, details);
  },

  async tvSeries() {
    const res = await fetch("https://api.themoviedb.org/3/tv/popular", {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`
      }
    }).then(res => res.json());

    const popularTvSeries = res.results.slice(0, 5);

    const backdropTvSeriesImages = popularTvSeries.map(tvSerie =>
      `https://image.tmdb.org/t/p/original${tvSerie.backdrop_path}`
    );

    const details = {

    }

    startCarrousel(backdropTvSeriesImages, details);
  }
}

function startCarrousel(images, details) {
  let item = document.querySelector(".popular-container");
  let index = 0;

  function showImages(image) {
    item.style.backgroundImage = `url(${images[image]})`;
    item.classList.remove("zoom-animation");
    void item.offsetWidth;
    item.classList.add("zoom-animation");
  }

  showImages(0);
  addDetails(details[0])

  setInterval(() => {
    index = (index + 1) % images.length;

    setTimeout(() => {
      showImages(index);
      addDetails(details[index]);
    }, 600);
  }, 10000);
}

function addDetails(detailsObject) {
  let details = document.querySelector(".popular-details");

  details.classList.remove("details-animation");
  void details.offsetWidth;
  details.classList.add("details-animation");

  while (details.firstChild) {
    details.removeChild(details.firstChild);
  }

  const titleElement = document.createElement("h2");
  const sinopseElement = document.createElement("p");

  titleElement.textContent = detailsObject.title;
  sinopseElement.textContent = detailsObject.sinopse;

  details.appendChild(titleElement);
  details.appendChild(sinopseElement);
}