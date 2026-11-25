import { daysBetween, pluralUk, today } from '../../utils.js';

const days = (n) => `${n} ${pluralUk(n, ['день', 'дні', 'днів'])}`;

/** Підказка під датою повернення: скільки лишилось / прострочено / чи вчасно повернули */
export default function DueInfo({ loan }) {
  if (loan.status === 'returned') {
    const late = daysBetween(loan.dueDate, loan.returnDate);
    return <span className="muted">{late > 0 ? `із запізненням ${late} дн.` : 'вчасно'}</span>;
  }

  const left = daysBetween(today(), loan.dueDate);
  if (left < 0) return <span className="text-danger">прострочено {days(-left)}</span>;
  if (left === 0) return <span className="text-warn">сьогодні</span>;
  return <span className={left <= 3 ? 'text-warn' : 'muted'}>ще {days(left)}</span>;
}
