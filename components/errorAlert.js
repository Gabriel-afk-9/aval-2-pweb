class ErrorAlert extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="error-container">
        <p class="error-mensage">Um erro inesperado aconteceu, sentimos muito</p>
      </div>
    `
  }
}

customElements.define("error-alert", ErrorAlert);