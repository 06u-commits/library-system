import Modal from '../Modal/Modal.jsx';

/** Вікно підтвердження дії */
export default function ConfirmModal({ title, message, confirmText = 'Підтвердити', danger, onConfirm, onClose }) {
  const confirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>Скасувати</button>
          <button className={`btn ${danger ? 'btn--danger' : 'btn--primary'}`} onClick={confirm}>
            {confirmText}
          </button>
        </>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}
