import { useState } from 'react';
import { useLibrary } from '../../store/LibraryContext.jsx';
import { Field, FormGrid, Modal } from '../../components/ui/index.js';
import { validateBook } from './validateBook.js';

export const EMPTY_BOOK = { title: '', author: '', isbn: '', year: '', genre: '', copies: 1 };

export default function BookForm({ initial, onClose, onSave }) {
  const { state, activeByBook } = useLibrary();
  const [form, setForm] = useState({ ...initial });
  const [errors, setErrors] = useState({});
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const genres = [...new Set(state.books.map((b) => b.genre).filter(Boolean))];

  const submit = (e) => {
    e.preventDefault();
    const onLoan = activeByBook.get(initial.id) ?? 0;
    const result = validateBook(form, { books: state.books, onLoan });
    setErrors(result.errors);
    if (Object.keys(result.errors).length === 0) onSave(result.value);
  };

  return (
    <Modal
      title={initial.id ? 'Редагування книги' : 'Нова книга'}
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>Скасувати</button>
          <button className="btn btn--primary" type="submit" form="book-form">Зберегти</button>
        </>
      }
    >
      <FormGrid id="book-form" onSubmit={submit}>
        <Field label="Назва *" error={errors.title} full>
          <input value={form.title} onChange={set('title')} autoFocus />
        </Field>
        <Field label="Автор *" error={errors.author} full>
          <input value={form.author} onChange={set('author')} />
        </Field>
        <Field label="Жанр">
          <input value={form.genre} onChange={set('genre')} list="genres" />
          <datalist id="genres">{genres.map((g) => <option key={g} value={g} />)}</datalist>
        </Field>
        <Field label="Рік видання" error={errors.year}>
          <input type="number" value={form.year} onChange={set('year')} />
        </Field>
        <Field label="ISBN" error={errors.isbn}>
          <input value={form.isbn} onChange={set('isbn')} placeholder="978-…" />
        </Field>
        <Field label="Кількість примірників *" error={errors.copies}>
          <input type="number" min="1" value={form.copies} onChange={set('copies')} />
        </Field>
      </FormGrid>
    </Modal>
  );
}
