# Бібліотечна інформаційна система (React)

Односторінковий застосунок на **React 18 + Vite** для обліку книг, читачів і видач.

## Запуск

```bash
npm install
npm run dev          # режим розробки → http://localhost:5173
npm run build        # продакшн-збірка в dist/
npm run build:single # увесь застосунок одним файлом dist-single/index.html
```

Потрібен Node.js 18+.

## Документація

```
docs/
├── 01-requirements/
│   └── requirements.md      # функціональні та нефункціональні вимоги, трасування
├── 02-technical-spec/       # технічне завдання (у розробці)
├── 03-uml/
│   ├── use-case.puml        # діаграма варіантів використання
│   └── use-cases.md         # актори та сценарії
├── 04-er-model/
│   ├── er-model.puml        # ER-діаграма
│   └── er-model.md          # опис сутностей, атрибутів і звʼязків
└── 05-glossary/
    └── glossary.md          # глосарій термінів
```

| Файл | Зміст |
|---|---|
| [requirements.md](docs/01-requirements/requirements.md) | Функціональні (FR) і нефункціональні (NFR) вимоги, пріоритети, критерії приймання, трасування |
| [use-case.puml](docs/03-uml/use-case.puml) | UML-діаграма варіантів використання (PlantUML) |
| [use-cases.md](docs/03-uml/use-cases.md) | Актори та сценарії варіантів використання |
| [er-model.puml](docs/04-er-model/er-model.puml) | ER-діаграма (PlantUML) |
| [er-model.md](docs/04-er-model/er-model.md) | Опис сутностей, атрибутів і звʼязків |
| [glossary.md](docs/05-glossary/glossary.md) | Глосарій термінів |

Діаграми `.puml` можна переглянути на [plantuml.com](https://www.plantuml.com/plantuml) або в VS Code з розширенням PlantUML.

## Можливості

**Огляд**
- список прострочених видач з кількістю днів прострочки та кнопкою «Повернути»;
- книги, термін повернення яких спливає за 3 дні;
- список найпопулярніших книг, останні видачі.

**Книги**
- додавання, редагування, видалення (назва, автор, жанр, рік, ISBN, кількість примірників);
- пошук за назвою / автором / ISBN, фільтр за жанром і наявністю, сортування за стовпцями;
- автоматичний підрахунок вільних примірників;
- перевірки: унікальність ISBN, коректний рік, не можна зменшити кількість примірників нижче виданих, не можна видалити книгу, що зараз на руках.

**Читачі**
- реєстрація з автоматичним номером читацького квитка (`Ч-0001`, …);
- пошук, фільтри «з книгами» та «боржники»;
- картка читача з повною історією видач;
- валідація телефону та email; не можна видалити читача з неповерненими книгами.

**Видачі**
- оформлення видачі (дата + термін у днях, за замовчуванням 14);
- правила: є вільний примірник; у читача немає прострочених книг; не більше 5 книг одночасно; та сама книга не видається одному читачу двічі;
- повернення, продовження терміну (+14 днів), видалення архівних записів;
- вкладки «Усі / На руках / Прострочені / Повернені», пошук, підсвічування прострочених.

**Дані**
- автоматичне збереження в `localStorage`;
- відновлення демо-даних, повне очищення.

## Структура

Усі компоненти функціональні (хуки). Великі сторінки розбиті на невеликі компоненти,
а логіку (фільтри, перевірки форм, дії з видачами) винесено у власні хуки та функції.
Кожен компонент, що має власні стилі, лежить поруч зі своїм `.css` файлом.
У `styles/global.css` лише змінні кольорів, базові елементи, кнопки, поля вводу та утиліти.

```
src/
├── main.jsx                      # точка входу, шрифти, глобальні стилі
├── App.jsx / App.css             # каркас і навігація між сторінками
├── styles/global.css             # змінні, кнопки, поля вводу, утиліти
├── utils.js                      # дати, статуси, допоміжні функції
├── data/seed.js                  # демонстраційні дані
├── store/
│   ├── LibraryContext.jsx        # Context, збереження в localStorage, похідні дані
│   └── libraryReducer.js         # усі зміни даних
├── hooks/useLoanActions.js       # повернути / продовжити / видалити видачу
├── components/
│   ├── layout/                   # Sidebar, Topbar, DataTools (кожен зі своїм .css)
│   ├── ui/                       # Card, DataTable, Modal, Field, FormGrid, Segmented,
│   │                             # SearchInput, Checkbox, Toolbar, SortableTh, StatusBadge,
│   │                             # Empty, ResultCount, Toast (+ index.js для імпорту)
│   └── IssueLoanModal/           # форма видачі + useIssueLoanForm + validateLoan
└── pages/
    ├── Dashboard/                # OverdueLoans, DueSoonLoans, PopularBooks, RecentLoans, LoanListItem
    ├── Books/                    # BooksToolbar, BooksTable, BookRow, BookForm, useBookFilters, validateBook
    ├── Readers/                  # ReadersToolbar, ReadersTable, ReaderRow, ReaderForm, ReaderCard,
    │                             # ReaderHistory, useReaderFilters, validateReader
    └── Loans/                    # LoansToolbar, LoansTable, LoanRow, DueInfo, useLoanFilters
```

## Модель даних

```js
Book   { id, title, author, isbn, year, genre, copies }
Reader { id, card, name, phone, email, registered }
Loan   { id, bookId, readerId, issueDate, dueDate, returnDate|null }
```

Статус видачі обчислюється: `returnDate` заповнено → «Повернено»; інакше `dueDate < сьогодні` → «Прострочено»; інакше → «На руках».

Щоб підключити серверну частину (REST API / БД), достатньо замінити `loadState`/`saveState` у `store/LibraryContext.jsx` та дії в `store/libraryReducer.js` на запити до API — компоненти сторінок змін не потребують.
