import { formatDate, today } from '../../../utils.js';
import './Topbar.css';

export default function Topbar({ title, onMenu }) {
  return (
    <header className="topbar">
      <button className="btn btn--sm topbar__menu" onClick={onMenu}>Меню</button>
      <h1 className="topbar__title">{title}</h1>
      <span className="muted">Сьогодні: {formatDate(today())}</span>
    </header>
  );
}
