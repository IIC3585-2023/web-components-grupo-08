let template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            display: block
        }
        
        :host[hidden] {
            display: none;
        }

        .invisible {
            display: none;
        }

        .header {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 5px;
        }

        .header:hover {
            background-color: lightblue;
        }
    </style>
    <div>
        <div class="header">
            <div class="toggle-button">⮞</div>
            <h3 id="categoryName"></h3>
        </div>
        <div class="child">
            <slot id="slotContent"></slot>
        </div>
    </div>
`

class TreeItem extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow( {mode: 'open'} )
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.childrenVisible = false;
        this.toggleButton = this._shadowRoot.querySelector('.toggle-button');
        this.toggleButton.addEventListener('click', this.toggleChildren);
    }

    toggleChildren = (event) => {
        event.stopPropagation()
        if (this.childrenVisible) {
            this._shadowRoot.querySelector('.child').classList.add('invisible');
            this.childrenVisible = false
            this.toggleButton.innerHTML = '⮞'
        }
        else {
            this._shadowRoot.querySelector('.child').classList.remove('invisible');
            this.childrenVisible = true
            this.toggleButton.innerHTML = '⮟'
        }
    }

    connectedCallback() {
        // Setting timeout so slotted content can load
        setTimeout( () => {
            // First, remove empty text elements.
            let elementsToRemove = []
            for (const node of this._shadowRoot.querySelector('#slotContent').assignedNodes()) {
                if ((node instanceof Text) && (node.textContent.trim().length === 0)) {
                    elementsToRemove.push(node)
                } 
            }
            for (const node of elementsToRemove) {
                node.remove();
            }

            // First child will be the title.
            let firstChild = this._shadowRoot.querySelector('#slotContent').assignedNodes()[0]
            if (firstChild instanceof Text) {
                const title = firstChild.textContent.trim();
                this._shadowRoot.querySelector('#categoryName').innerHTML = title
                firstChild.remove();
            }
            else {
                const title = firstChild;
                this._shadowRoot.querySelector('#categoryName').appendChild(title);
            }
            // At the start, every child will be hidden.
            this._shadowRoot.querySelector('.child').classList.add('invisible');
            if (this._shadowRoot.querySelector('#slotContent').assignedNodes().length > 0) {
                this.childrenVisible = false;
                this.toggleButton.innerHTML = '⮞';
            }
            else {
                // Else, we remove the arrow image.
                this.toggleButton.innerHTML = '';
            }
        })
    }
}

customElements.define('tree-item', TreeItem);
