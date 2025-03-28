import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'


document.addEventListener('DOMContentLoaded', () => {
    const rootElem = document.getElementById('root');
    if (rootElem) {
      createRoot(rootElem).render(<App />);
    } else {
      console.error('Root element not found');
    }
  });