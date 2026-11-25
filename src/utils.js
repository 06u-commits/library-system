export const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

/** Сьогоднішня дата у форматі YYYY-MM-DD (локальний час) */
export const today = () => toISODate(new Date());

export const toISODate = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const addDays = (iso, days) => {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return toISODate(d);
};

export const daysBetween = (fromIso, toIso) =>
  Math.round(
    (new Date(toIso + 'T00:00:00') - new Date(fromIso + 'T00:00:00')) / 86400000
  );

export const formatDate = (iso) => {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
};

/** Статус видачі: active | overdue | returned */
export const loanStatus = (loan, now = today()) => {
  if (loan.returnDate) return 'returned';
  return loan.dueDate < now ? 'overdue' : 'active';
};

export const STATUS_LABELS = {
  active: 'На руках',
  overdue: 'Прострочено',
  returned: 'Повернено',
};

export const normalize = (s) => (s ?? '').toString().toLowerCase().trim();

export const pluralUk = (n, [one, few, many]) => {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return one;
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
  return many;
};
