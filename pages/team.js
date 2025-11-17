class TeamPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="team-page">
        <h2 class="team-title">Equipe de Desenvolvimento</h2>

        <div class="team-container">
          <div class="team-container-intern" id="team-container-1"></div>
          <div class="team-container-intern" id="team-container-2"></div>
        </div>
      </div>
    `
  }
}

customElements.define("team-page", TeamPage);