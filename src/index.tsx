import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import DOMPurify from 'dompurify';
import { ScrambledChips } from './ScrambledChips';
import { Quiz } from './Quiz';

function sanitize(s: string): string {
  function removeHtmlTags(input: string) {
    // Remove all tags by allowing none
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  }

  return removeHtmlTags(s)
      .replace(/&[^;\s]+;/g, ' ')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/[\n\r\t]/g, ' ')
      .replace(/\s\s+/g, ' ')
      .trim(); ;
}

class ScrambledChipsElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const sanitizedAnswer = sanitize(this.innerHTML || '');
    const state = this.getAttribute('state') === 'front' ? 'front' : 'back';

    const root = ReactDOM.createRoot(mountPoint);
    root.render(<ScrambledChips answer={sanitizedAnswer} state={state}></ScrambledChips>);
  }

  disconnectedCallback() {
  }
}

class QuizElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const sentence = sanitize(this.innerHTML || '');
    const words = this.getAttribute('words') || '';

    const root = ReactDOM.createRoot(mountPoint);
    root.render(<Quiz words={words} sentence={sentence}></Quiz>);
  }

  disconnectedCallback() {
  }
}

customElements.define('anki-bard', ScrambledChipsElement);
customElements.define('anki-quiz', QuizElement);

reportWebVitals();