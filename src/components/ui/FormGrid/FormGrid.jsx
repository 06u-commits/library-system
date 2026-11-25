import './FormGrid.css';

/** Форма з полями у дві колонки */
export default function FormGrid({ id, onSubmit, children }) {
  return (
    <form id={id} className="form-grid" onSubmit={onSubmit} noValidate>
      {children}
    </form>
  );
}
