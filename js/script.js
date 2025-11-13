const API = "https://api.themoviedb.org/3"
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjlmNDQ2MjMwMGNkMGU5ZWVjZmQzZGFhNDQzYjhiNyIsIm5iZiI6MTc2Mjk5Njk3Ni4wMzYsInN1YiI6IjY5MTUzMmYwNjkwN2EyMzllNjRjOTNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4XKtnmrOxVYNoiWchVda_uRw2n_pHUetGYHGu_Q4duw";

document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("panel");

  async function getTeste() {
    const res = await fetch(`${API}/search/multi?query=batman&language=pt-BR&page=1&include_adult=false`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      }
    }).then(res => res.json());

    return res;
  }

  panel.addEventListener("click", async () => {
    const result = await getTeste();
    
    result.results.forEach(r => {
      console.log(r);
      const element = document.createElement("div");
      const img = document.createElement("img");
      const imageUrl = `https://image.tmdb.org/t/p/w500${r.poster_path}`;
      img.src = r.poster_path ? `${imageUrl}` : "sem imagem";
      element.className = "child";
      element.textContent = r.name || r.title;
      panel.appendChild(element);
      panel.appendChild(img);
    });
  })
})