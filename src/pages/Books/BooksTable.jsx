import { Card, DataTable, Empty, SortableTh } from '../../components/ui/index.js';
import BookRow from './BookRow.jsx';

export default function BooksTable({ rows, sort, onSort, emptyText, onIssue, onEdit, onDelete }) {
  const th = (field, label, className) => (
    <SortableTh field={field} sort={sort} onSort={onSort} className={className}>{label}</SortableTh>
  );

  const head = (
    <tr>
      {th('title', 'Назва')}
      {th('author', 'Автор')}
      {th('year', 'Рік', 'num')}
      {th('genre', 'Жанр')}
      <th>ISBN</th>
      {th('copies', 'Примірн.', 'num')}
      {th('available', 'Вільно', 'num')}
      <th className="actions">Дії</th>
    </tr>
  );

  return (
    <Card flush>
      {rows.length === 0 ? (
        <Empty>{emptyText}</Empty>
      ) : (
        <DataTable head={head}>
          {rows.map((b) => (
            <BookRow key={b.id} book={b} onIssue={onIssue} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </DataTable>
      )}
    </Card>
  );
}
