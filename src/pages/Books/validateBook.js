/**
 * Перевірка форми книги.
 * books — увесь каталог (для унікальності ISBN), onLoan — скільки примірників цієї книги зараз видано.
 * Повертає { errors, value }, де value — очищені дані для збереження.
 */
export function validateBook(form, { books, onLoan }) {
  const errors = {};
  const value = {
    ...form,
    title: form.title.trim(),
    author: form.author.trim(),
    genre: form.genre.trim(),
    isbn: form.isbn.trim(),
    year: form.year === '' ? '' : Number(form.year),
    copies: Number(form.copies),
  };
  const thisYear = new Date().getFullYear();

  if (!value.title) errors.title = "Обов'язкове поле";
  if (!value.author) errors.author = "Обов'язкове поле";

  if (value.year !== '' && (!Number.isInteger(value.year) || value.year < 1000 || value.year > thisYear))
    errors.year = `Рік від 1000 до ${thisYear}`;

  if (!Number.isInteger(value.copies) || value.copies < 1) errors.copies = 'Щонайменше 1 примірник';
  else if (value.copies < onLoan) errors.copies = `Зараз видано ${onLoan} — не можна зменшити нижче`;

  if (value.isbn && !/^[\d\-Xx ]{10,17}$/.test(value.isbn)) errors.isbn = 'Некоректний формат ISBN';
  else if (value.isbn && books.some((b) => b.id !== form.id && b.isbn === value.isbn))
    errors.isbn = 'Книга з таким ISBN уже є';

  return { errors, value };
}
