import { DEFAULT_LOAN_DAYS, useLibrary } from '../store/LibraryContext.jsx';
import { useToast } from '../components/ui/Toast/ToastProvider.jsx';
import { addDays, formatDate, today } from '../utils.js';

/** Дії з видачами, які потрібні на кількох сторінках */
export function useLoanActions() {
  const { dispatch, bookById } = useLibrary();
  const notify = useToast();

  const returnLoan = (loan) => {
    dispatch({ type: 'loan/return', id: loan.id });
    notify(`Книгу «${bookById.get(loan.bookId)?.title ?? ''}» повернено`);
  };

  // продовжуємо від дати повернення, а якщо вона вже минула — від сьогодні
  const extendLoan = (loan) => {
    const now = today();
    const dueDate = addDays(loan.dueDate > now ? loan.dueDate : now, DEFAULT_LOAN_DAYS);
    dispatch({ type: 'loan/extend', id: loan.id, dueDate });
    notify(`Термін продовжено до ${formatDate(dueDate)}`);
  };

  const deleteLoan = (loan) => {
    dispatch({ type: 'loan/delete', id: loan.id });
    notify('Запис видалено');
  };

  return { returnLoan, extendLoan, deleteLoan };
}
