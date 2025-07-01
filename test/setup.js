import '@testing-library/jest-dom';

// Mock HTMLDialogElement if not available
if (!global.HTMLDialogElement) {
  global.HTMLDialogElement = class HTMLDialogElement extends HTMLElement {
    constructor() {
      super();
      this.open = false;
    }
    
    show() {
      this.open = true;
    }
    
    showModal() {
      this.open = true;
    }
    
    close() {
      this.open = false;
    }
  };
  
  global.customElements.define('dialog', global.HTMLDialogElement);
}
