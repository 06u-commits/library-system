import './DataTable.css';

/** Таблиця з горизонтальною прокруткою. head — рядок заголовків (<tr>), children — рядки тіла. */
export default function DataTable({ head, children }) {
  return (
    <div className="data-table">
      <table className="data-table__table">
        <thead>{head}</thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
