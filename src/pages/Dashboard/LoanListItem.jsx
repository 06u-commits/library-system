import './LoanListItem.css';

/** Рядок списку на огляді: назва і підпис зліва, aside — справа */
export default function LoanListItem({ title, subtitle, aside }) {
  return (
    <li className="loan-item">
      <div>
        <strong>{title}</strong>
        <div className="muted">{subtitle}</div>
      </div>
      <div className="loan-item__aside">{aside}</div>
    </li>
  );
}

export function LoanList({ children }) {
  return <ul className="loan-list">{children}</ul>;
}
