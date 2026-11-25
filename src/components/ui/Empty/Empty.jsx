import './Empty.css';

/** Повідомлення про порожній список. inline — без відступів, по лівому краю. */
export default function Empty({ children, inline }) {
  return <div className={`empty ${inline ? 'empty--inline' : ''}`}>{children}</div>;
}
