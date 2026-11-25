import { useState } from 'react';
import Sidebar from './components/layout/Sidebar/Sidebar.jsx';
import Topbar from './components/layout/Topbar/Topbar.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Books from './pages/Books/Books.jsx';
import Readers from './pages/Readers/Readers.jsx';
import Loans from './pages/Loans/Loans.jsx';
import './App.css';

const PAGES = {
  dashboard: { title: 'Огляд', component: Dashboard },
  books: { title: 'Книги', component: Books },
  readers: { title: 'Читачі', component: Readers },
  loans: { title: 'Видачі', component: Loans },
};

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const Page = PAGES[page].component;

  const navigate = (key) => {
    setPage(key);
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <Sidebar
        pages={PAGES}
        current={page}
        onNavigate={navigate}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <main className="app__main">
        <Topbar title={PAGES[page].title} onMenu={() => setMenuOpen(true)} />
        <Page onNavigate={navigate} />
      </main>
    </div>
  );
}
