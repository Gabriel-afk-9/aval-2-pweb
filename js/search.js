import { Config } from "./config.js";
import { Format } from "./format.js";

export async function getSearch(search, type) {
  const formatedSearch = Format.search(search);

  try {
    const result = await fetch(
      `${Config.API_HOST}/search/multi?query=${formatedSearch}&language=pt-BR&page=1&include_adult=${Config.INCLUDE_ADULT}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Config.TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    return result;
  } catch (err) {
    const errorAlert = document.querySelector("error-alert");
    errorAlert.style.display = "block";

    setTimeout(() => {
      errorAlert.style.display = "none";
    }, 5000);
  }
}
