export default function InputTitle({ value, onChange }: any) {
  return (
    <span className="modal__row">
      <span className="row__title">Назва: *</span>
      <input
        className="modal__input"
        type="text"
        name="title"
        value={value}
        onChange={onChange}
        placeholder="Введіть назву"
      />
    </span>
  );
}
