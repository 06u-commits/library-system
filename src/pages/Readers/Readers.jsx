import { useState } from 'react';
import { useLibrary } from '../../store/LibraryContext.jsx';
import { ConfirmModal, ResultCount, useToast } from '../../components/ui/index.js';
import IssueLoanModal from '../../components/IssueLoanModal/IssueLoanModal.jsx';
import ReadersToolbar from './ReadersToolbar.jsx';
import ReadersTable from './ReadersTable.jsx';
import ReaderForm, { EMPTY_READER } from './ReaderForm.jsx';
import ReaderCard from './ReaderCard.jsx';
import { useReaderFilters } from './useReaderFilters.js';

export default function Readers() {
  const { state, dispatch, activeByReader, overdueByReader } = useLibrary();
  const notify = useToast();
  const filters = useReaderFilters(state.readers, activeByReader, overdueByReader);

  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [issuing, setIssuing] = useState(null);

  const askDelete = (reader) => {
    if (activeByReader.has(reader.id)) notify('Неможливо видалити: у читача є неповернені книги', 'error');
    else setDeleting(reader);
  };

  const save = (reader) => {
    dispatch({ type: reader.id ? 'reader/update' : 'reader/add', payload: reader });
    notify(reader.id ? 'Зміни збережено' : `Читача ${reader.name} зареєстровано`);
    setEditing(null);
  };

  const remove = () => {
    dispatch({ type: 'reader/delete', id: deleting.id });
    notify('Читача видалено');
  };

  return (
    <div className="page">
      <ReadersToolbar filters={filters} onAdd={() => setEditing(EMPTY_READER)} />
      <ReadersTable
        rows={filters.rows}
        emptyText={state.readers.length ? 'Нічого не знайдено' : 'Читачів ще немає'}
        onView={setViewing}
        onIssue={(r) => setIssuing(r.id)}
        onEdit={setEditing}
        onDelete={askDelete}
      />
      <ResultCount shown={filters.rows.length} total={state.readers.length} />

      {editing && <ReaderForm initial={editing} onClose={() => setEditing(null)} onSave={save} />}
      {viewing && <ReaderCard reader={viewing} onClose={() => setViewing(null)} />}
      {issuing && <IssueLoanModal readerId={issuing} onClose={() => setIssuing(null)} />}
      {deleting && (
        <ConfirmModal
          title="Видалити читача?"
          message={`Читача ${deleting.name} (${deleting.card}) та його історію видач буде видалено.`}
          confirmText="Видалити"
          danger
          onClose={() => setDeleting(null)}
          onConfirm={remove}
        />
      )}
    </div>
  );
}
