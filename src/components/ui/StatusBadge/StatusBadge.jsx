import { STATUS_LABELS } from '../../../utils.js';
import './StatusBadge.css';

/** Статус видачі кольоровим словом. label — щоб показати власний текст. */
export default function StatusBadge({ status, label, inline }) {
  return (
    <span className={`status status--${status} ${inline ? 'status--inline' : ''}`}>
      {label ?? STATUS_LABELS[status]}
    </span>
  );
}
