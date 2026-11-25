import { useState } from 'react';
import { Field, FormGrid, Modal } from '../../components/ui/index.js';
import { validateReader } from './validateReader.js';

export const EMPTY_READER = { name: '', phone: '', email: '' };

export default function ReaderForm({ initial, onClose, onSave }) {
  const [form, setForm] = useState({ ...initial });
  const [errors, setErrors] = useState({});
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const result = validateReader(form);
    setErrors(result.errors);
    if (Object.keys(result.errors).length === 0) onSave(result.value);
  };

  return (
    <Modal
      title={initial.id ? `Редагування: ${initial.card}` : 'Реєстрація читача'}
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>Скасувати</button>
          <button className="btn btn--primary" type="submit" form="reader-form">Зберегти</button>
        </>
      }
    >
      <FormGrid id="reader-form" onSubmit={submit}>
        <Field label="ПІБ *" error={errors.name} full>
          <input value={form.name} onChange={set('name')} autoFocus placeholder="Прізвище Ім'я" />
        </Field>
        <Field label="Телефон" error={errors.phone}>
          <input value={form.phone} onChange={set('phone')} placeholder="+380 …" />
        </Field>
        <Field label="Email" error={errors.email}>
          <input type="email" value={form.email} onChange={set('email')} />
        </Field>
        {!initial.id && (
          <p className="form-grid__note muted small">Номер читацького квитка буде присвоєно автоматично.</p>
        )}
      </FormGrid>
    </Modal>
  );
}
