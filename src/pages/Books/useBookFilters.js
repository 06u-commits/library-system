import { useMemo, useState } from 'react';
import { normalize } from '../../utils.js';

const compare = (a, b) =>
  typeof a === 'number' || typeof b === 'number'
    ? (Number(a) || 0) - (Number(b) || 0)
    : String(a ?? '').localeCompare(String(b ?? ''), 'uk');

/** Пошук, фільтри та сортування каталогу */
export function useBookFilters(books, available) {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sort, setSort] = useState({ key: 'title', dir: 1 });

  const sortBy = (key) => setSort((s) => ({ key, dir: s.key === key ? -s.dir : 1 }));

  const genres = useMemo(
    () => [...new Set(books.map((b) => b.genre).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'uk')),
    [books]
  );

  const rows = useMemo(() => {
    const q = normalize(query);
    return books
      .filter((b) => !q || [b.title, b.author, b.isbn].some((v) => normalize(v).includes(q)))
      .filter((b) => !genre || b.genre === genre)
      .map((b) => ({ ...b, available: available(b.id) }))
      .filter((b) => !onlyAvailable || b.available > 0)
      .sort((a, b) => compare(a[sort.key], b[sort.key]) * sort.dir);
  }, [books, query, genre, onlyAvailable, sort, available]);

  return {
    filters: { query, setQuery, genre, setGenre, onlyAvailable, setOnlyAvailable, genres },
    sort,
    sortBy,
    rows,
  };
}
