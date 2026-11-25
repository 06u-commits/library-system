import { Card, DataTable, Empty } from '../../components/ui/index.js';
import LoanRow from './LoanRow.jsx';

const HEAD = (
  <tr>
    <th>Книга</th>
    <th>Читач</th>
    <th>Видано</th>
    <th>Повернути до</th>
    <th>Повернено</th>
    <th>Статус</th>
    <th className="actions">Дії</th>
  </tr>
);

export default function LoansTable({ rows, ...actions }) {
  return (
    <Card flush>
      {rows.length === 0 ? (
        <Empty>Видач за цим фільтром немає</Empty>
      ) : (
        <DataTable head={HEAD}>
          {rows.map((l) => <LoanRow key={l.id} loan={l} {...actions} />)}
        </DataTable>
      )}
    </Card>
  );
}
