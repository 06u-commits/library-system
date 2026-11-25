import './Toolbar.css';

/** Панель над таблицею: фільтри зліва, children з actions — справа */
export default function Toolbar({ children, actions }) {
  return (
    <div className="toolbar">
      {children}
      <div className="toolbar__spacer" />
      {actions}
    </div>
  );
}
