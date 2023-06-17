/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       * @type {string}
       */
      name: {type: String},

      /**
       * The number of times the button has been clicked.
       * @type {number}
       */
      count: {type: Number},

      /**
       * The number of times the button has been clicked.
       * @type {number}
       */
      rating: { type: Number },

        /**
       * The number of times the button has been clicked.
       * @type {number}
       */
      discount: { type: Number },
  };
}

  createRenderRoot() {
    return this;
  }

  getRatingStars() {
    const stars = [];
    for (let i = 0; i < this.rating; i++) {
      stars.push('⭐');
    }
    return stars.join(' ');
  }

  constructor() {
    super();
    this.name = 'World';
    this.count = 0;
    this.discount = 0;
  }

  render() {
    return html`
      <h1>${this.sayHello(this.name)}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
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

  _onClick() {
    this.count++;
    this.dispatchEvent(new CustomEvent('count-changed'));
  }

  /**
   * Formats a greeting
   * @param name {string} The name to say "Hello" to
   * @returns {string} A greeting directed at `name`
   */
  sayHello(name) {
    return `Hello, ${name}`;
  }
}

window.customElements.define('my-element', MyElement);
