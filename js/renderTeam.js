export function renderTeam(team) {
  const container1 = document.querySelector("#team-container-1");
  const container2 = document.querySelector("#team-container-2");
  
  team.forEach(p => {
    const element = document.createElement("team-card");

    element.setAttribute("name", p.name);
    element.setAttribute("img", p.img);
    element.setAttribute("git-hub", p.gh);
    element.setAttribute("desc", p.desc);

    container1.children.length >= 2 ? container2.appendChild(element) : container1.appendChild(element);
  });
}