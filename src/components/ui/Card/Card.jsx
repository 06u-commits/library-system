import './Card.css';

/** Біла картка з необовʼязковим заголовком і дією справа. flush — без внутрішніх відступів (для таблиць). */
export default function Card({ title, action, flush, children }) {
  return (
    <section className={`card ${flush ? 'card--flush' : ''}`}>
      {(title || action) && (
        <div className="card__head">
          {title && <h3 className="card__title">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
