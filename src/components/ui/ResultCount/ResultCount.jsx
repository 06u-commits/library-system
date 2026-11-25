import './ResultCount.css';

export default function ResultCount({ shown, total }) {
  return <p className="result-count">Показано {shown} з {total}</p>;
}
