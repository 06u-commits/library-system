/** Перевірка форми читача. Повертає { errors, value } з очищеними даними. */
export function validateReader(form) {
  const errors = {};
  const value = { ...form, name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() };

  if (value.name.split(/\s+/).length < 2) errors.name = "Вкажіть ім'я та прізвище";

  if (!value.phone && !value.email) errors.phone = 'Потрібен телефон або email';
  else if (value.phone && !/^\+?[\d\s()-]{10,18}$/.test(value.phone)) errors.phone = 'Некоректний номер телефону';

  if (value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) errors.email = 'Некоректний email';

  return { errors, value };
}
