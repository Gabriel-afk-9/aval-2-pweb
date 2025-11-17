import { Config } from "./config.js";

export async function getSearchId(id, type) {
  try {
    const result = await fetch(`${Config.API_HOST}/${type}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return result;
  } catch (err) {
    const errorAlert = document.querySelector("error-alert");
    errorAlert.style.display = "block";

    setTimeout(() => {
      errorAlert.style.display = "none";
    }, 5000);
  }
}
