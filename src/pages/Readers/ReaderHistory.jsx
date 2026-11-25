import { useLibrary } from '../../store/LibraryContext.jsx';
import { useLoanActions } from '../../hooks/useLoanActions.js';
import { formatDate, loanStatus, today } from '../../utils.js';
import { DataTable, Empty, StatusBadge } from '../../components/ui/index.js';

const HEAD = (
  <tr><th>Книга</th><th>Видано</th><th>Термін</th><th>Повернено</th><th>Статус</th><th /></tr>
);

export default function ReaderHistory({ loans }) {
  const { bookById } = useLibrary();
  const { returnLoan } = useLoanActions();
  const now = today();

  if (loans.length === 0) return <Empty>Читач ще не брав книг</Empty>;

  return (
    <DataTable head={HEAD}>
      {loans.map((l) => {
        const status = loanStatus(l, now);
        return (
          <tr key={l.id}>
            <td>{bookById.get(l.bookId)?.title ?? '—'}</td>
            <td>{formatDate(l.issueDate)}</td>
            <td>{formatDate(l.dueDate)}</td>
            <td>{formatDate(l.returnDate)}</td>
            <td><StatusBadge status={status} /></td>
            <td className="actions">
              {status !== 'returned' && (
                <button className="btn btn--sm" onClick={() => returnLoan(l)}>Повернути</button>
              )}
            </td>
          </tr>
        );
      })}
    </DataTable>
  );
}
