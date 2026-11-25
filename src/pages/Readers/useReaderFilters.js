import { useMemo, useState } from 'react';
import { normalize } from '../../utils.js';

export const READER_FILTERS = [
  { value: 'all', label: 'Усі' },
  { value: 'withBooks', label: 'З книгами' },
  { value: 'debtors', label: 'Боржники' },
];

/** Пошук і фільтр списку читачів */
export function useReaderFilters(readers, activeByReader, overdueByReader) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const rows = useMemo(() => {
    const q = normalize(query);
    const matchesFilter = (r) =>
      filter === 'debtors' ? overdueByReader.has(r.id) : filter === 'withBooks' ? activeByReader.has(r.id) : true;

    return readers
      .filter((r) => !q || [r.name, r.card, r.phone, r.email].some((v) => normalize(v).includes(q)))
      .filter(matchesFilter)
      .sort((a, b) => a.name.localeCompare(b.name, 'uk'));
  }, [readers, query, filter, activeByReader, overdueByReader]);

  return { query, setQuery, filter, setFilter, rows };
}
