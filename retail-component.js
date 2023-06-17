import { html, css, LitElement } from 'lit';
//import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
//const { html, css, LitElement } = require('lit');

class RetailComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: Arial, sans-serif;
    }

    .rating {
      color: orange;
    }

    .discount {
      font-weight: bold;
    }
  `;

  static properties = {
    rating: { type: Number },
    discount: { type: Number },
  };

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div>
        <span class="rating">${this.getRatingStars()}</span>
      </div>
      <div>
        ${this.discount
          ? html`<span class="discount">${this.discount}% off</span>`
          : null}
      </div>
    `;
  }

  getRatingStars() {
    const stars = [];
    for (let i = 0; i < this.rating; i++) {
      stars.push('⭐');
    }
    return stars.join(' ');
  }
}

customElements.define('retail-component', RetailComponent);
