import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DOMPurify from 'dompurify';

class MyCustomElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const answer = this.innerHTML || '';

    const sanitizedAnswer = removeHtmlTags(answer)
      .replace(/&[^;\s]+;/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/[\n\r\t]/g, ' ')
      .replace(/\s\s+/g, ' ')
      .trim(); ;
    const state = this.getAttribute('state') === 'front' ? 'front' : 'back';

    const root = ReactDOM.createRoot(mountPoint);
    root.render(<App answer={sanitizedAnswer} state={state}></App>);
  }

  disconnectedCallback() {
  }
}

customElements.define('anki-bard', MyCustomElement);

reportWebVitals();

function removeHtmlTags(input: string) {
  // Remove all tags by allowing none
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};