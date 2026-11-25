import { createSeed } from '../data/seed.js';
import { today, uid } from '../utils.js';

/** Усі зміни даних бібліотеки проходять через цей редʼюсер */
export function libraryReducer(state, action) {
  switch (action.type) {
    case 'book/add':
      return { ...state, books: [...state.books, { ...action.payload, id: uid() }] };
    case 'book/update':
      return { ...state, books: replaceById(state.books, action.payload) };
    case 'book/delete':
      return {
        ...state,
        books: state.books.filter((b) => b.id !== action.id),
        loans: state.loans.filter((l) => l.bookId !== action.id),
      };

    case 'reader/add': {
      const card = `Ч-${String(state.nextCard).padStart(4, '0')}`;
      return {
        ...state,
        nextCard: state.nextCard + 1,
        readers: [...state.readers, { ...action.payload, id: uid(), card, registered: today() }],
      };
    }
    case 'reader/update':
      return { ...state, readers: replaceById(state.readers, action.payload) };
    case 'reader/delete':
      return {
        ...state,
        readers: state.readers.filter((r) => r.id !== action.id),
        loans: state.loans.filter((l) => l.readerId !== action.id),
      };

    case 'loan/issue':
      return { ...state, loans: [...state.loans, { ...action.payload, id: uid(), returnDate: null }] };
    case 'loan/return':
      return { ...state, loans: patchById(state.loans, action.id, { returnDate: action.date ?? today() }) };
    case 'loan/extend':
      return { ...state, loans: patchById(state.loans, action.id, { dueDate: action.dueDate }) };
    case 'loan/delete':
      return { ...state, loans: state.loans.filter((l) => l.id !== action.id) };

    case 'reset':
      return createSeed();
    case 'clear':
      return { books: [], readers: [], loans: [], nextCard: 1 };
    default:
      return state;
  }
}

const replaceById = (list, item) => list.map((x) => (x.id === item.id ? item : x));
const patchById = (list, id, patch) => list.map((x) => (x.id === id ? { ...x, ...patch } : x));
