import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { LibraryProvider } from './store/LibraryContext.jsx';
import { ToastProvider } from './components/ui/Toast/ToastProvider.jsx';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/cyrillic-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/cyrillic-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/cyrillic-600.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LibraryProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </LibraryProvider>
  </React.StrictMode>
);
