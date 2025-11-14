class LoadingSpinner extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="loading-spinner"></div>
    `
  }
}

customElements.define("loading-spinner", LoadingSpinner);