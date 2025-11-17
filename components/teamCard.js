class TeamCard extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute("name");
    const img = this.getAttribute("img");
    const github = this.getAttribute("git-hub");
    const desc = this.getAttribute("desc");

    this.innerHTML = `
      <div class="team-card">
        <img src="${img}" class="team-image">

        <div class="team-info">
          <h2 class="team-name">${name}</h2>
          <p class="team-desc">${desc}</p>
          <a href="${github}" class="team-link">Github</a>
        </div>
      </div>
    `
  }
}

customElements.define("team-card", TeamCard);