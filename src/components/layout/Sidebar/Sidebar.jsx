import { useLibrary } from '../../../store/LibraryContext.jsx';
import DataTools from '../DataTools/DataTools.jsx';
import './Sidebar.css';

export default function Sidebar({ pages, current, onNavigate, open, onClose }) {
  const { overdue } = useLibrary();

  return (
    <>
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="sidebar__brand">
          <div className="sidebar__name">Бібліотека</div>
          <div className="sidebar__sub">Інформаційна система</div>
        </div>

        <nav className="sidebar__nav">
          {Object.entries(pages).map(([key, p]) => (
            <button
              key={key}
              className={`sidebar__item ${current === key ? 'is-active' : ''}`}
              onClick={() => onNavigate(key)}
            >
              {p.title}
              {key === 'loans' && overdue > 0 && <span className="sidebar__badge">{overdue}</span>}
            </button>
          ))}
        </nav>

        <DataTools />
      </aside>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
    </>
  );
}
