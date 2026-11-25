import { addDays, today } from '../utils.js';

/** Демонстраційні дані — створюються під час першого запуску */
export function createSeed() {
  const t = today();

  const books = [
    { id: 'b1', title: 'Кобзар', author: 'Тарас Шевченко', isbn: '978-966-03-4512-7', year: 1840, genre: 'Поезія', copies: 4 },
    { id: 'b2', title: 'Тигролови', author: 'Іван Багряний', isbn: '978-966-10-1867-3', year: 1944, genre: 'Роман', copies: 3 },
    { id: 'b3', title: 'Intermezzo', author: 'Михайло Коцюбинський', isbn: '978-966-01-0392-5', year: 1908, genre: 'Новела', copies: 2 },
    { id: 'b4', title: 'Лісова пісня', author: 'Леся Українка', isbn: '978-966-03-5210-1', year: 1911, genre: 'Драма', copies: 3 },
    { id: 'b5', title: 'Місто', author: 'Валерʼян Підмогильний', isbn: '978-617-585-012-4', year: 1928, genre: 'Роман', copies: 2 },
    { id: 'b6', title: 'Захар Беркут', author: 'Іван Франко', isbn: '978-966-10-3211-2', year: 1883, genre: 'Історичний роман', copies: 2 },
    { id: 'b7', title: 'Чистий код', author: 'Роберт Мартін', isbn: '978-617-095-044-4', year: 2008, genre: 'Компʼютерна література', copies: 1 },
    { id: 'b8', title: 'Маруся Чурай', author: 'Ліна Костенко', isbn: '978-966-03-7105-8', year: 1979, genre: 'Поезія', copies: 2 },
  ];

  const readers = [
    { id: 'r1', card: 'Ч-0001', name: 'Олена Коваленко', phone: '+380 67 123 45 67', email: 'olena.k@example.com', registered: addDays(t, -320) },
    { id: 'r2', card: 'Ч-0002', name: 'Андрій Шевчук', phone: '+380 50 987 65 43', email: 'a.shevchuk@example.com', registered: addDays(t, -210) },
    { id: 'r3', card: 'Ч-0003', name: 'Ірина Бондар', phone: '+380 93 555 12 34', email: 'iryna.bondar@example.com', registered: addDays(t, -95) },
    { id: 'r4', card: 'Ч-0004', name: 'Максим Ткаченко', phone: '+380 63 222 33 44', email: 'max.tk@example.com', registered: addDays(t, -30) },
    { id: 'r5', card: 'Ч-0005', name: 'Софія Мельник', phone: '+380 97 444 77 88', email: 'sofia.m@example.com', registered: addDays(t, -12) },
  ];

  const loans = [
    { id: 'l1', bookId: 'b1', readerId: 'r1', issueDate: addDays(t, -10), dueDate: addDays(t, 4), returnDate: null },
    { id: 'l2', bookId: 'b2', readerId: 'r2', issueDate: addDays(t, -25), dueDate: addDays(t, -11), returnDate: null },
    { id: 'l3', bookId: 'b4', readerId: 'r3', issueDate: addDays(t, -40), dueDate: addDays(t, -26), returnDate: addDays(t, -28) },
    { id: 'l4', bookId: 'b7', readerId: 'r4', issueDate: addDays(t, -3), dueDate: addDays(t, 11), returnDate: null },
    { id: 'l5', bookId: 'b5', readerId: 'r1', issueDate: addDays(t, -60), dueDate: addDays(t, -46), returnDate: addDays(t, -44) },
    { id: 'l6', bookId: 'b3', readerId: 'r5', issueDate: addDays(t, -16), dueDate: addDays(t, -2), returnDate: null },
  ];

  return { books, readers, loans, nextCard: 6 };
}
