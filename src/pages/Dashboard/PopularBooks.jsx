import { useMemo } from 'react';
import { useLibrary } from '../../store/LibraryContext.jsx';
import { pluralUk } from '../../utils.js';
import { Card, Empty } from '../../components/ui/index.js';
import './PopularBooks.css';

const TOP = 5;

export default function PopularBooks() {
  const { state, bookById } = useLibrary();

  const popular = useMemo(() => {
    const counts = new Map();
    state.loans.forEach((l) => counts.set(l.bookId, (counts.get(l.bookId) ?? 0) + 1));
    return [...counts.entries()]
      .map(([id, n]) => ({ book: bookById.get(id), n }))
      .filter((x) => x.book)
      .sort((a, b) => b.n - a.n)
      .slice(0, TOP);
  }, [state.loans, bookById]);

  return (
    <Card title="Найпопулярніші книги">
      {popular.length === 0 ? (
        <Empty inline>Ще не було жодної видачі.</Empty>
      ) : (
        <ol className="popular">
          {popular.map(({ book, n }, i) => (
            <li key={book.id} className="popular__item">
              <span className="popular__num">{i + 1}.</span>
              <span className="popular__title">
                {book.title} <span className="muted">— {book.author}</span>
              </span>
              <span className="popular__count">{n} {pluralUk(n, ['видача', 'видачі', 'видач'])}</span>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
