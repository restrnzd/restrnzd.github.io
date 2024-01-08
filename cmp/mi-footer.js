class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        & Zavala Detor Rodrigo Nicolas.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
