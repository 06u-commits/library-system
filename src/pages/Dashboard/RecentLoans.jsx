import { useLibrary } from '../../store/LibraryContext.jsx';
import { formatDate, loanStatus, today } from '../../utils.js';
import { Card, DataTable, Empty, StatusBadge } from '../../components/ui/index.js';

const LIMIT = 6;

export default function RecentLoans({ onShowAll }) {
  const { state, bookById, readerById } = useLibrary();
  const now = today();
  const recent = [...state.loans].sort((a, b) => b.issueDate.localeCompare(a.issueDate)).slice(0, LIMIT);

  const showAll = <button className="btn btn--ghost btn--sm" onClick={onShowAll}>Усі видачі</button>;

  return (
    <Card title="Останні видачі" action={showAll}>
      {recent.length === 0 ? (
        <Empty>Видач поки немає</Empty>
      ) : (
        <DataTable
          head={<tr><th>Книга</th><th>Читач</th><th>Видано</th><th>Повернути до</th><th>Статус</th></tr>}
        >
          {recent.map((l) => (
            <tr key={l.id}>
              <td>{bookById.get(l.bookId)?.title ?? '—'}</td>
              <td>{readerById.get(l.readerId)?.name ?? '—'}</td>
              <td>{formatDate(l.issueDate)}</td>
              <td>{formatDate(l.dueDate)}</td>
              <td><StatusBadge status={loanStatus(l, now)} /></td>
            </tr>
          ))}
        </DataTable>
      )}
    </Card>
  );
}
