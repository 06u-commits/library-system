import { useState } from 'react';
import { useLibrary } from '../../store/LibraryContext.jsx';
import { ConfirmModal, ResultCount, useToast } from '../../components/ui/index.js';
import IssueLoanModal from '../../components/IssueLoanModal/IssueLoanModal.jsx';
import BooksToolbar from './BooksToolbar.jsx';
import BooksTable from './BooksTable.jsx';
import BookForm, { EMPTY_BOOK } from './BookForm.jsx';
import { useBookFilters } from './useBookFilters.js';

export default function Books() {
  const { state, dispatch, available, activeByBook } = useLibrary();
  const notify = useToast();
  const { filters, sort, sortBy, rows } = useBookFilters(state.books, available);

  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [issuing, setIssuing] = useState(null);

  const askDelete = (book) => {
    if (activeByBook.has(book.id)) notify('Неможливо видалити: книга зараз видана читачам', 'error');
    else setDeleting(book);
  };

  const save = (book) => {
    dispatch({ type: book.id ? 'book/update' : 'book/add', payload: book });
    notify(book.id ? 'Зміни збережено' : `Книгу «${book.title}» додано`);
    setEditing(null);
  };

  const remove = () => {
    dispatch({ type: 'book/delete', id: deleting.id });
    notify('Книгу видалено');
  };

  return (
    <div className="page">
      <BooksToolbar filters={filters} onAdd={() => setEditing(EMPTY_BOOK)} />
      <BooksTable
        rows={rows}
        sort={sort}
        onSort={sortBy}
        emptyText={state.books.length ? 'Нічого не знайдено' : 'Каталог порожній — додайте першу книгу'}
        onIssue={(b) => setIssuing(b.id)}
        onEdit={setEditing}
        onDelete={askDelete}
      />
      <ResultCount shown={rows.length} total={state.books.length} />

      {editing && <BookForm initial={editing} onClose={() => setEditing(null)} onSave={save} />}
      {issuing && <IssueLoanModal bookId={issuing} onClose={() => setIssuing(null)} />}
      {deleting && (
        <ConfirmModal
          title="Видалити книгу?"
          message={`Книгу «${deleting.title}» та історію її видач буде видалено назавжди.`}
          confirmText="Видалити"
          danger
          onClose={() => setDeleting(null)}
          onConfirm={remove}
        />
      )}
    </div>
  );
}
