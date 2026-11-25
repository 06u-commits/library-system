import { useMemo, useState } from 'react';
import { useLibrary } from '../../store/LibraryContext.jsx';
import { loanStatus, normalize, today } from '../../utils.js';

const TABS = [
  { value: 'all', label: 'Усі' },
  { value: 'open', label: 'На руках' },
  { value: 'overdue', label: 'Прострочені' },
  { value: 'returned', label: 'Повернені' },
];

const inTab = (tab, status) =>
  tab === 'all' ? true : tab === 'open' ? status !== 'returned' : status === tab;

// спочатку прострочені, потім на руках (за терміном), потім повернені (новіші вгорі)
const RANK = { overdue: 0, active: 1, returned: 2 };
const byPriority = (a, b) =>
  RANK[a.status] - RANK[b.status] ||
  (a.status === 'returned' ? b.returnDate.localeCompare(a.returnDate) : a.dueDate.localeCompare(b.dueDate));

/** Вкладки, пошук і сортування списку видач */
export function useLoanFilters() {
  const { state, bookById, readerById } = useLibrary();
  const [tab, setTab] = useState('open');
  const [query, setQuery] = useState('');
  const now = today();

  // видачі разом із книгою, читачем і статусом
  const all = useMemo(
    () =>
      state.loans.map((l) => ({
        ...l,
        status: loanStatus(l, now),
        book: bookById.get(l.bookId),
        reader: readerById.get(l.readerId),
      })),
    [state.loans, bookById, readerById, now]
  );

  const tabs = TABS.map((t) => ({ ...t, count: all.filter((l) => inTab(t.value, l.status)).length }));

  const rows = useMemo(() => {
    const q = normalize(query);
    const matches = (l) =>
      !q || [l.book?.title, l.book?.author, l.reader?.name, l.reader?.card].some((v) => normalize(v).includes(q));
    return all.filter((l) => inTab(tab, l.status) && matches(l)).sort(byPriority);
  }, [all, tab, query]);

  return { tab, setTab, tabs, query, setQuery, rows, total: all.length };
}
