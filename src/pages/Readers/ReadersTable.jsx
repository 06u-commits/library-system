import { Card, DataTable, Empty } from '../../components/ui/index.js';
import ReaderRow from './ReaderRow.jsx';

const HEAD = (
  <tr>
    <th>Квиток</th>
    <th>ПІБ</th>
    <th>Телефон</th>
    <th>Email</th>
    <th>Зареєстровано</th>
    <th className="num">На руках</th>
    <th className="actions">Дії</th>
  </tr>
);

export default function ReadersTable({ rows, emptyText, ...actions }) {
  return (
    <Card flush>
      {rows.length === 0 ? (
        <Empty>{emptyText}</Empty>
      ) : (
        <DataTable head={HEAD}>
          {rows.map((r) => <ReaderRow key={r.id} reader={r} {...actions} />)}
        </DataTable>
      )}
    </Card>
  );
}
