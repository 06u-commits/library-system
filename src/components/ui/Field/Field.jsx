import './Field.css';

/** Підпис + поле вводу + помилка або підказка */
export default function Field({ label, error, hint, children, full }) {
  return (
    <label className={`field ${full ? 'field--full' : ''}`}>
      <span className="field__label">{label}</span>
      {children}
      {error ? <span className="field__error">{error}</span> : hint && <span className="field__hint">{hint}</span>}
    </label>
  );
}
