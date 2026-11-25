import { useState } from 'react';
import { useLoanActions } from '../../hooks/useLoanActions.js';
import { ConfirmModal, ResultCount } from '../../components/ui/index.js';
import IssueLoanModal from '../../components/IssueLoanModal/IssueLoanModal.jsx';
import LoansToolbar from './LoansToolbar.jsx';
import LoansTable from './LoansTable.jsx';
import { useLoanFilters } from './useLoanFilters.js';

export default function Loans() {
  const filters = useLoanFilters();
  const { returnLoan, extendLoan, deleteLoan } = useLoanActions();
  const [issuing, setIssuing] = useState(false);
  const [deleting, setDeleting] = useState(null);

  return (
    <div className="page">
      <LoansToolbar filters={filters} onIssue={() => setIssuing(true)} />
      <LoansTable rows={filters.rows} onReturn={returnLoan} onExtend={extendLoan} onDelete={setDeleting} />
      <ResultCount shown={filters.rows.length} total={filters.total} />

      {issuing && <IssueLoanModal onClose={() => setIssuing(false)} />}
      {deleting && (
        <ConfirmModal
          title="Видалити запис?"
          message="Запис про цю видачу буде видалено з історії."
          confirmText="Видалити"
          danger
          onClose={() => setDeleting(null)}
          onConfirm={() => deleteLoan(deleting)}
        />
      )}
    </div>
  );
}
