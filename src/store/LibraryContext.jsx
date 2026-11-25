import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { createSeed } from '../data/seed.js';
import { loanStatus, today } from '../utils.js';
import { libraryReducer } from './libraryReducer.js';

const STORAGE_KEY = 'library-system-v1';
export const DEFAULT_LOAN_DAYS = 14;
export const MAX_ACTIVE_LOANS = 5;

/* ---------- збереження у localStorage ---------- */
function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed && Array.isArray(parsed.books)) return parsed;
  } catch {
    /* сховище недоступне або дані пошкоджені */
  }
  return createSeed();
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ігноруємо */
  }
}

/* ---------- похідні дані: довідники та лічильники ---------- */
const increment = (map, key) => map.set(key, (map.get(key) ?? 0) + 1);

function deriveData(state) {
  const now = today();
  const bookById = new Map(state.books.map((b) => [b.id, b]));
  const readerById = new Map(state.readers.map((r) => [r.id, r]));
  const activeByBook = new Map();
  const activeByReader = new Map();
  const overdueByReader = new Map();

  for (const l of state.loans) {
    const status = loanStatus(l, now);
    if (status === 'returned') continue;
    increment(activeByBook, l.bookId);
    increment(activeByReader, l.readerId);
    if (status === 'overdue') increment(overdueByReader, l.readerId);
  }

  const overdue = [...overdueByReader.values()].reduce((s, n) => s + n, 0);
  const available = (bookId) => (bookById.get(bookId)?.copies ?? 0) - (activeByBook.get(bookId) ?? 0);

  return { bookById, readerById, activeByBook, activeByReader, overdueByReader, overdue, available };
}

/* ---------- контекст ---------- */
const LibraryContext = createContext(null);

export function LibraryProvider({ children }) {
  const [state, dispatch] = useReducer(libraryReducer, undefined, loadState);

  useEffect(() => saveState(state), [state]);

  const value = useMemo(() => ({ state, dispatch, ...deriveData(state) }), [state]);
  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error('useLibrary must be used inside LibraryProvider');
  return ctx;
}
