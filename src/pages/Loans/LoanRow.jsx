import { DEFAULT_LOAN_DAYS } from '../../store/LibraryContext.jsx';
import { formatDate } from '../../utils.js';
import { StatusBadge } from '../../components/ui/index.js';
import DueInfo from './DueInfo.jsx';
import './LoanRow.css';

/** loan — видача з полями status, book, reader (див. useLoanFilters) */
export default function LoanRow({ loan, onReturn, onExtend, onDelete }) {
  const { book, reader, status } = loan;

  return (
    <tr className={status === 'overdue' ? 'loan-row--overdue' : ''}>
      <td>
        <strong>{book?.title ?? '— видалено —'}</strong>
        <div className="muted small">{book?.author}</div>
      </td>
      <td>
        {reader?.name ?? '— видалено —'}
        <div className="muted small">{reader?.card}</div>
      </td>
      <td>{formatDate(loan.issueDate)}</td>
      <td>
        {formatDate(loan.dueDate)}
        <div className="small"><DueInfo loan={loan} /></div>
      </td>
      <td>{formatDate(loan.returnDate)}</td>
      <td><StatusBadge status={status} /></td>
      <td className="actions">
        {status === 'returned' ? (
          <button className="btn btn--sm btn--ghost-danger" onClick={() => onDelete(loan)}>Видалити запис</button>
        ) : (
          <>
            <button className="btn btn--sm" onClick={() => onReturn(loan)}>Повернути</button>
            <button className="btn btn--sm btn--ghost" onClick={() => onExtend(loan)} title={`+${DEFAULT_LOAN_DAYS} днів`}>
              Продовжити
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
