import { MAX_ACTIVE_LOANS } from '../../store/LibraryContext.jsx';

/**
 * Правила видачі книги. Повертає обʼєкт помилок { поле: текст }; порожній — усе гаразд.
 * lib — дані з useLibrary(): state, available, activeByReader, overdueByReader
 */
export function validateLoan(form, lib) {
  const errors = {};
  const { state, available, activeByReader, overdueByReader } = lib;

  if (!form.readerId) errors.readerId = 'Оберіть читача';
  else if (overdueByReader.has(form.readerId))
    errors.readerId = 'У читача є прострочені книги — спершу поверніть їх';
  else if ((activeByReader.get(form.readerId) ?? 0) >= MAX_ACTIVE_LOANS)
    errors.readerId = `Ліміт: не більше ${MAX_ACTIVE_LOANS} книг одночасно`;

  const alreadyHas = state.loans.some(
    (l) => l.bookId === form.bookId && l.readerId === form.readerId && !l.returnDate
  );
  if (!form.bookId) errors.bookId = 'Оберіть книгу';
  else if (available(form.bookId) <= 0) errors.bookId = 'Немає вільних примірників';
  else if (form.readerId && alreadyHas) errors.bookId = 'Цей читач уже має цю книгу';

  if (!form.issueDate) errors.issueDate = 'Вкажіть дату';

  const days = Number(form.days);
  if (!Number.isInteger(days) || days < 1 || days > 90) errors.days = 'Від 1 до 90 днів';

  return errors;
}
