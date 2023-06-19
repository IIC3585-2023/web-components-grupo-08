class TreeItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
    }
  
    connectedCallback() {
      const expandButton = this.shadowRoot.querySelector('.expand-button');
      expandButton.addEventListener('click', this.toggleChildren.bind(this));
    }
  
    toggleChildren() {
      const childrenContainer = this.shadowRoot.querySelector('.children-container');
      childrenContainer.classList.toggle('hidden');
    }
  
    render() {
      const depth = this.getAttribute('depth') || 0;
      const indentSize = depth * 20;
      const hasChildren = this.hasChildNodes();
  
      this.shadowRoot.innerHTML = `
        <style>
          .tree-item {
            margin-left: ${indentSize}px;
          }
  
          .expand-button {
            cursor: pointer;
            margin-right: 5px;
            display: ${hasChildren ? 'inline' : 'none'};
          }
  
          .children-container {
            display: ${hasChildren ? 'block' : 'none'};
          }
  
          .hidden {
            display: none;
          }
        </style>
        <div class="tree-item">
          <span class="expand-button">▶</span>
          <slot></slot>
          <div class="children-container ${hasChildren ? '' : 'hidden'}">
            <slot name="children"></slot>
          </div>
        </div>
      `;
    }
  }
  
  customElements.define('tree-item', TreeItem);
  