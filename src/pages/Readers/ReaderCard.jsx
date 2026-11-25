import { useLibrary } from '../../store/LibraryContext.jsx';
import { formatDate } from '../../utils.js';
import { Modal } from '../../components/ui/index.js';
import ReaderHistory from './ReaderHistory.jsx';
import './ReaderCard.css';

/** Картка читача: контакти та історія видач */
export default function ReaderCard({ reader, onClose }) {
  const { state } = useLibrary();
  const loans = state.loans
    .filter((l) => l.readerId === reader.id)
    .sort((a, b) => b.issueDate.localeCompare(a.issueDate));

  const details = [
    ['Телефон', reader.phone || '—'],
    ['Email', reader.email || '—'],
    ['Зареєстровано', formatDate(reader.registered)],
    ['Усього видач', loans.length],
  ];

  return (
    <Modal title={`${reader.name} · ${reader.card}`} onClose={onClose} wide>
      <div className="reader-card__details">
        {details.map(([label, value]) => (
          <div key={label} className="reader-card__detail">
            <span className="reader-card__label">{label}</span>
            {value}
          </div>
        ))}
      </div>
      <h4 className="subhead">Історія видач</h4>
      <ReaderHistory loans={loans} />
    </Modal>
  );
}
