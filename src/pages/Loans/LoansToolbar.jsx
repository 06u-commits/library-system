import { SearchInput, Segmented, Toolbar } from '../../components/ui/index.js';

export default function LoansToolbar({ filters, onIssue }) {
  const { tab, setTab, tabs, query, setQuery } = filters;

  return (
    <Toolbar actions={<button className="btn btn--primary" onClick={onIssue}>+ Нова видача</button>}>
      <Segmented options={tabs} value={tab} onChange={setTab} />
      <SearchInput value={query} onChange={setQuery} placeholder="Пошук за книгою, автором, читачем…" />
    </Toolbar>
  );
}
