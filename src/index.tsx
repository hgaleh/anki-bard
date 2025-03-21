import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

class MyCustomElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const answer = this.getAttribute('answer') || '';
    const state = this.getAttribute('state') === 'front' ? 'front' : 'back';

    const root = ReactDOM.createRoot(mountPoint);
    root.render(<App answer={answer} state={state}></App>);
  }

  disconnectedCallback() {
  }
}

customElements.define('anki-bard', MyCustomElement);

reportWebVitals();
