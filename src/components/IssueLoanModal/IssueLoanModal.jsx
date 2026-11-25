import { useMemo } from 'react';
import { MAX_ACTIVE_LOANS, useLibrary } from '../../store/LibraryContext.jsx';
import { formatDate, today } from '../../utils.js';
import { Field, FormGrid, Modal } from '../ui/index.js';
import { useIssueLoanForm } from './useIssueLoanForm.js';

const byField = (field) => (a, b) => a[field].localeCompare(b[field], 'uk');

/** Оформлення нової видачі. Книгу або читача можна передати наперед. */
export default function IssueLoanModal({ onClose, bookId, readerId }) {
  const { state, available, activeByReader } = useLibrary();
  const { form, set, errors, dueDate, submit } = useIssueLoanForm({ bookId, readerId, onDone: onClose });

  const readers = useMemo(() => [...state.readers].sort(byField('name')), [state.readers]);
  const books = useMemo(() => [...state.books].sort(byField('title')), [state.books]);
  const readerHint = form.readerId && `Зараз на руках: ${activeByReader.get(form.readerId) ?? 0} з ${MAX_ACTIVE_LOANS}`;

  return (
    <Modal
      title="Нова видача"
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>Скасувати</button>
          <button className="btn btn--primary" type="submit" form="issue-form">Видати книгу</button>
        </>
      }
    >
      <FormGrid id="issue-form" onSubmit={submit}>
        <Field label="Читач *" error={errors.readerId} hint={readerHint} full>
          <select value={form.readerId} onChange={set('readerId')}>
            <option value="">— оберіть читача —</option>
            {readers.map((r) => (
              <option key={r.id} value={r.id}>{r.card} · {r.name}</option>
            ))}
          </select>
        </Field>

        <Field label="Книга *" error={errors.bookId} full>
          <select value={form.bookId} onChange={set('bookId')}>
            <option value="">— оберіть книгу —</option>
            {books.map((b) => {
              const free = available(b.id);
              return (
                <option key={b.id} value={b.id} disabled={free <= 0}>
                  {b.title} — {b.author} ({free > 0 ? `вільно ${free}` : 'немає'})
                </option>
              );
            })}
          </select>
        </Field>

        <Field label="Дата видачі *" error={errors.issueDate}>
          <input type="date" value={form.issueDate} max={today()} onChange={set('issueDate')} />
        </Field>

        <Field label="Термін, днів *" error={errors.days} hint={dueDate && `Повернути до ${formatDate(dueDate)}`}>
          <input type="number" min="1" max="90" value={form.days} onChange={set('days')} />
        </Field>
      </FormGrid>
    </Modal>
  );
}
