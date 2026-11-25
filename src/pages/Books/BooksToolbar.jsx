import { Checkbox, SearchInput, Toolbar } from '../../components/ui/index.js';

export default function BooksToolbar({ filters, onAdd }) {
  const { query, setQuery, genre, setGenre, onlyAvailable, setOnlyAvailable, genres } = filters;

  return (
    <Toolbar actions={<button className="btn btn--primary" onClick={onAdd}>+ Додати книгу</button>}>
      <SearchInput value={query} onChange={setQuery} placeholder="Пошук за назвою, автором або ISBN…" />
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">Усі жанри</option>
        {genres.map((g) => <option key={g} value={g}>{g}</option>)}
      </select>
      <Checkbox checked={onlyAvailable} onChange={setOnlyAvailable}>Лише в наявності</Checkbox>
    </Toolbar>
  );
}
