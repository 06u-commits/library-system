import { Card } from '../../components/ui/index.js';
import OverdueLoans from './OverdueLoans.jsx';
import DueSoonLoans from './DueSoonLoans.jsx';
import PopularBooks from './PopularBooks.jsx';
import RecentLoans from './RecentLoans.jsx';

export default function Dashboard({ onNavigate }) {
  return (
    <div className="page">
      <Card title="Прострочені видачі">
        <OverdueLoans />
        <DueSoonLoans />
      </Card>
      <PopularBooks />
      <RecentLoans onShowAll={() => onNavigate('loans')} />
    </div>
  );
}
