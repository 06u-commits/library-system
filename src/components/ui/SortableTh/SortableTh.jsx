import './SortableTh.css';

/** Заголовок стовпця, за яким можна сортувати. sort = { key, dir: 1 | -1 } */
export default function SortableTh({ field, sort, onSort, className = '', children }) {
  const active = sort.key === field;
  return (
    <th className={`sortable-th ${className}`} onClick={() => onSort(field)}>
      {children} {active && (sort.dir === 1 ? '▲' : '▼')}
    </th>
  );
}
