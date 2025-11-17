export function renderTeam(team) {
  const container = document.querySelector(".team-container");
  
  team.forEach(p => {
    const element = document.createElement("team-card");

    element.setAttribute("name", p.name);
    element.setAttribute("img", p.img);
    element.setAttribute("git-hub", p.gh);
    element.setAttribute("desc", p.desc);

    container.appendChild(element);
  });
}