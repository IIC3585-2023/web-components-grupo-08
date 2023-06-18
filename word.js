import { html, LitElement } from "lit";

export class WordViewer extends LitElement {
  // TODO: Declare a reactive property `words`.
  static get properties() {
    return {
      words: { type: String },
    };
  }
  constructor() {
    super();
    this.words = "Hello";
  }

  render() {
    return html`<p>${this.words}</p>`;
  }
}
customElements.define("word-viewer", WordViewer);
