import { useLibrary } from '../../store/LibraryContext.jsx';
import { useLoanActions } from '../../hooks/useLoanActions.js';
import { daysBetween, loanStatus, pluralUk, today } from '../../utils.js';
import { Empty } from '../../components/ui/index.js';
import LoanListItem, { LoanList } from './LoanListItem.jsx';

export default function OverdueLoans() {
  const { state, bookById, readerById } = useLibrary();
  const { returnLoan } = useLoanActions();
  const now = today();

  const overdue = state.loans
    .filter((l) => loanStatus(l, now) === 'overdue')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  if (overdue.length === 0) return <Empty inline>Прострочених видач немає.</Empty>;

  return (
    <LoanList>
      {overdue.map((l) => {
        const reader = readerById.get(l.readerId);
        const late = daysBetween(l.dueDate, now);
        return (
          <LoanListItem
            key={l.id}
            title={bookById.get(l.bookId)?.title ?? '—'}
            subtitle={`${reader?.name ?? '—'}, ${reader?.phone ?? ''}`}
            aside={
              <>
                <span className="text-danger">
                  {late} {pluralUk(late, ['день', 'дні', 'днів'])} прострочки
                </span>
                <button className="btn btn--sm" onClick={() => returnLoan(l)}>Повернути</button>
              </>
            }
          />
        );
      })}
    </LoanList>
  );
}
