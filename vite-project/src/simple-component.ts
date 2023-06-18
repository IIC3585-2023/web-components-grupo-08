import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('simple-component')
export class MyElement extends LitElement {
  @property()
  imageSrc = "https://www.paris.cl/dw/image/v2/BCHW_PRD/on/demandware.static/-/Sites-cencosud-master-catalog/default/dw6765eb15/images/imagenes-productos/704/394327-0000-001.jpg?sw=513&sh=654&sm=fit"

  @property({})
  discount = this.attributes

  @property()
  price = this.attributes

  @property()
  discount_price = this.attributes

  render() {
    return html`
    <div class="full-card">
        <div class="card">
            <div class="header">
                <div class="discount-card">
                    <h2 class="discount-text">${this.discount}%</h2>
                </div>
            </div>
            <div class="image">
                <img src="${this.imageSrc}" alt="phone" width=150/>
            </div>
            <div class="info">
                <p>Smartphone Samsung Galaxy Js Core Negro</p>
                <p class="price">$${this.discount_price}</p>
                <p class="old-price">Normal:<s>$${this.price}</s></p>
            </div>
            <star-rating></star-rating>
        </div>
    </div>
    `
  }


  static styles = css`
    .full-card {
        background-color: #f7f7f7;
        width: 25%;
        height: 500px;
        padding: 5px;
        min-width: 200px
    }

    .card {
        background-color: #ffffff;
        padding: 5px;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: end;
    }

    .image {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .discount-text {
        color: #ffffff;
    }

    .discount-card {
        background-color: #69ddcb;
        height: 65px;
        width: 75px;
        display: flex;
        justify-content: center;
    }

    .price {
        color: #2bb3e8;
        font-weight: bold;
        font-size: 30px; 
        margin: 0px;
    }

    .old-price {
        color: #bababa;
        margin: 0px;
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'simple-component': MyElement
  }
}
