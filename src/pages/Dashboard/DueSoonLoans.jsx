import { useLibrary } from '../../store/LibraryContext.jsx';
import { daysBetween, formatDate, loanStatus, today } from '../../utils.js';
import LoanListItem, { LoanList } from './LoanListItem.jsx';

const SOON_DAYS = 3;

/** Видачі, термін яких спливає найближчими днями */
export default function DueSoonLoans() {
  const { state, bookById, readerById } = useLibrary();
  const now = today();

  const soon = state.loans
    .filter((l) => loanStatus(l, now) === 'active' && daysBetween(now, l.dueDate) <= SOON_DAYS)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  if (soon.length === 0) return null;

  return (
    <>
      <h4 className="subhead">Термін спливає найближчими днями</h4>
      <LoanList>
        {soon.map((l) => (
          <LoanListItem
            key={l.id}
            title={bookById.get(l.bookId)?.title}
            subtitle={readerById.get(l.readerId)?.name}
            aside={<span className="text-warn">до {formatDate(l.dueDate)}</span>}
          />
        ))}
      </LoanList>
    </>
  );
}
