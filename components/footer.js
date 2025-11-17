class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="footer">
        <img src="./assets/lucide-Clapperboard-Outlined.svg" alt="icon" class="icon">

        <div class="footer-body">
          <div class="footer-section">
            <a id="go-movies-footer">Filmes</a>
            <a id="go-tv-footer">Séries</a>
            <a id="go-releases-footer">Lançamentos</a>
            <a id="go-populars-footer">Mais Populares</a>
            <a id="go-bests-footer">Top Avaliados</a>
          </div>

          <div class="footer-section">
            <a>Em dev</a>
          </div>
            
          <div class="footer-section">
            <a id="go-team">Equipe</a>
          </div>
        </div>

        <div class="footer-authors">
          <p class="footer-author">Samuel Nascimento</p>
          <hr class="footer-divisor">
          <p class="footer-author">Gabriel Lima</p>
          <hr class="footer-divisor">
          <p class="footer-author">Alan</p>
          <hr class="footer-divisor">
          <p class="footer-author">Paulo Henrique</p>
        </div>
      </div>
    `
  }
}

customElements.define("footer-component", Footer);