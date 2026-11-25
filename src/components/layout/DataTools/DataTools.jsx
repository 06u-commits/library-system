import { useState } from 'react';
import { useLibrary } from '../../../store/LibraryContext.jsx';
import { useToast } from '../../ui/Toast/ToastProvider.jsx';
import ConfirmModal from '../../ui/ConfirmModal/ConfirmModal.jsx';
import './DataTools.css';

const ACTIONS = [
  {
    label: 'Демо-дані',
    title: 'Відновити демо-дані?',
    message: 'Поточні дані буде замінено демонстраційними.',
    type: 'reset',
  },
  {
    label: 'Очистити все',
    title: 'Очистити всі дані?',
    message: 'Буде видалено всі книги, читачів та видачі. Дію неможливо скасувати.',
    type: 'clear',
  },
];

/** Скидання даних */
export default function DataTools() {
  const { dispatch } = useLibrary();
  const notify = useToast();
  const [pending, setPending] = useState(null);

  return (
    <div className="data-tools">
      <div className="data-tools__title">Дані</div>
      {ACTIONS.map((a) => (
        <button key={a.type} className="data-tools__item" onClick={() => setPending(a)}>
          {a.label}
        </button>
      ))}

      {pending && (
        <ConfirmModal
          title={pending.title}
          message={pending.message}
          confirmText="Так"
          danger
          onClose={() => setPending(null)}
          onConfirm={() => {
            dispatch({ type: pending.type });
            notify('Готово');
          }}
        />
      )}
    </div>
  );
}
