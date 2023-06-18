import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('star-rating')
export class MyElement extends LitElement {

  render() {
    return html`
      <div>
      <h1>ESTRELLAS</h1>
      </div>
    `
  }


  static styles = css`
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'star-rating': MyElement
  }
}
