import { Config } from "./config";
import { Format } from "./format";

export async function getSearch(search, type) {
  const formatedSearch = Format.search(search);

  const result = await fetch(`${Config.API_HOST}/search/${type || "multi"}?query=${formatedSearch}&language=pt-BR&page=1&include_adult=${Config.INCLUDE_ADULT}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Config.TOKEN}`,
      "Content-Type": "application/json"
    }
  }).then(res => res.json());

  return result;
}