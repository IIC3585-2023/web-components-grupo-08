// Create a class for the element
class ExpandingList extends HTMLUListElement {
  constructor() {
    // Always call super first in constructor
    // Return value from super() is a reference to this element
    self = super();

    // Get ul and li elements that are a child of this custom ul element
    // li elements can be containers if they have uls within them
    const uls = Array.from(self.querySelectorAll("ul"));
    const lis = Array.from(self.querySelectorAll("li"));

    // Hide all child uls
    // These lists will be shown when the user clicks a higher level container
    uls.forEach((ul) => {
      ul.style.display = "none";
    });

    // Look through each li element in the ul
    lis.forEach((li) => {
      // If this li has a ul as a child, decorate it and add a click handler
      if (li.querySelectorAll("ul").length > 0) {
        // Add an attribute which can be used  by the style
        // to show an open or closed icon
        li.setAttribute("class", "closed");

        // Wrap the li element's text in a new span element
        // so we can assign style and event handlers to the span
        const childText = li.childNodes[0];
        const newSpan = document.createElement("span");

        // Copy text from li to span, set cursor style
        newSpan.textContent = childText.textContent;
        newSpan.style.cursor = "pointer";

        // Add click handler to this span
        newSpan.onclick = self.showul;

        // Add the span and remove the bare text node from the li
        childText.parentNode.insertBefore(newSpan, childText);
        childText.parentNode.removeChild(childText);
      }
    });
  }

  // li click handler
  showul = function (e) {
    // next sibling to the span should be the ul
    const nextul = e.target.nextElementSibling;

    // Toggle visible state and update class attribute on ul
    if (nextul.style.display == "block") {
      nextul.style.display = "none";
      nextul.parentNode.setAttribute("class", "closed");
    } else {
      nextul.style.display = "block";
      nextul.parentNode.setAttribute("class", "open");
    }
  };
}

// Define the new element
customElements.define("expanding-list", ExpandingList, { extends: "ul" });
class TreeItem2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border-radius: 5px;
          margin-bottom: 10px;
          font-size: 16px;
          font-family: Arial, sans-serif;
        }

        ul {
          list-style-type: none;
          padding-left: 25px;
          font-size: 16px;
          font-family: Arial, sans-serif;
        }

        li > button {
          display: none;
        }

        li.has-children > button {
          display: inline-block;
          padding: 8px 16px;
          border: none;
          border-radius: 50%;
          background-color: #007bff;
          color: #fff;
          font-size: 14px;
          text-align: center;
          cursor: pointer;

        }

        button {
          cursor: pointer;
        }

        span {
          color: black;
        }
      </style>

      <li>
        <button>+</button><slot></slot>
        <ul>
        </ul>
      </li>
    `;
  }

  connectedCallback() {
    const button = this.shadowRoot.querySelector("button");
    const ul = this.shadowRoot.querySelector("ul");
    const children = Array.from(this.children);

    if (children.length > 0) {
      const firstLi = this.shadowRoot.querySelector("li");
      firstLi.classList.add("has-children");
      ul.append(...children);
      ul.style.display = "none";
    }

    button.addEventListener("click", () => {
      const isExpanded = button.textContent === "-";
      button.textContent = isExpanded ? "+" : "-";
      ul.style.display = isExpanded ? "none" : "block";
    });
  }
}

customElements.define("tree-item2", TreeItem2);
