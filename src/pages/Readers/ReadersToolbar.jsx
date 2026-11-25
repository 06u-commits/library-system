import { SearchInput, Segmented, Toolbar } from '../../components/ui/index.js';
import { READER_FILTERS } from './useReaderFilters.js';

export default function ReadersToolbar({ filters, onAdd }) {
  const { query, setQuery, filter, setFilter } = filters;

  return (
    <Toolbar actions={<button className="btn btn--primary" onClick={onAdd}>+ Зареєструвати читача</button>}>
      <SearchInput value={query} onChange={setQuery} placeholder="Пошук за ПІБ, квитком, телефоном, email…" />
      <Segmented options={READER_FILTERS} value={filter} onChange={setFilter} />
    </Toolbar>
  );
}
