import { useLibrary } from '../../store/LibraryContext.jsx';
import { formatDate } from '../../utils.js';
import { StatusBadge } from '../../components/ui/index.js';
import './ReaderRow.css';

export default function ReaderRow({ reader, onView, onIssue, onEdit, onDelete }) {
  const { activeByReader, overdueByReader } = useLibrary();

  return (
    <tr>
      <td className="mono">{reader.card}</td>
      <td>
        <button className="link" onClick={() => onView(reader)}>{reader.name}</button>
        {overdueByReader.has(reader.id) && <StatusBadge status="overdue" label="боржник" inline />}
      </td>
      <td className="reader-row__phone">{reader.phone || '—'}</td>
      <td>{reader.email || '—'}</td>
      <td>{formatDate(reader.registered)}</td>
      <td className="num">{activeByReader.get(reader.id) ?? 0}</td>
      <td className="actions">
        <button className="btn btn--sm" onClick={() => onIssue(reader)}>Видати</button>
        <button className="btn btn--sm btn--ghost" onClick={() => onEdit(reader)}>Редагувати</button>
        <button className="btn btn--sm btn--ghost-danger" onClick={() => onDelete(reader)}>Видалити</button>
      </td>
    </tr>
  );
}
