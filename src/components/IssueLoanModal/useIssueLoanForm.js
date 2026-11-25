import { useState } from 'react';
import { DEFAULT_LOAN_DAYS, useLibrary } from '../../store/LibraryContext.jsx';
import { useToast } from '../ui/Toast/ToastProvider.jsx';
import { addDays, formatDate, today } from '../../utils.js';
import { validateLoan } from './validateLoan.js';

/** Стан і відправка форми видачі */
export function useIssueLoanForm({ bookId = '', readerId = '', onDone }) {
  const lib = useLibrary();
  const notify = useToast();
  const [form, setForm] = useState({ bookId, readerId, issueDate: today(), days: DEFAULT_LOAN_DAYS });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const dueDate =
    form.issueDate && Number(form.days) > 0 ? addDays(form.issueDate, Number(form.days)) : '';

  const submit = (e) => {
    e.preventDefault();
    const found = validateLoan(form, lib);
    setErrors(found);
    if (Object.keys(found).length) return;

    const { bookId, readerId, issueDate } = form;
    lib.dispatch({ type: 'loan/issue', payload: { bookId, readerId, issueDate, dueDate } });
    notify(`Видано «${lib.bookById.get(bookId)?.title}» до ${formatDate(dueDate)}`);
    onDone();
  };

  return { form, set, errors, dueDate, submit };
}
