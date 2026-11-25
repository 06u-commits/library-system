import './BookRow.css';

export default function BookRow({ book, onIssue, onEdit, onDelete }) {
  const free = book.available > 0;

  return (
    <tr>
      <td><strong>{book.title}</strong></td>
      <td>{book.author}</td>
      <td className="num">{book.year || '—'}</td>
      <td>{book.genre || '—'}</td>
      <td className="mono">{book.isbn || '—'}</td>
      <td className="num">{book.copies}</td>
      <td className="num">
        <span className={`book-row__free ${free ? '' : 'book-row__free--none'}`}>{book.available}</span>
      </td>
      <td className="actions">
        <button className="btn btn--sm" disabled={!free} onClick={() => onIssue(book)}>Видати</button>
        <button className="btn btn--sm btn--ghost" onClick={() => onEdit(book)}>Редагувати</button>
        <button className="btn btn--sm btn--ghost-danger" onClick={() => onDelete(book)}>Видалити</button>
      </td>
    </tr>
  );
}
