export default function ModalSelect(props: any) {
  return (
    <span className="modal__row">
      <span className="row__title">{props.enums.TITLE}: </span>
      <select
        className="modal__select"
        name={props.enums.NAME}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((item: string, index: number) => {
          return (
            <option
              value={item}
              key={index}
            >
              {props.enums[item]}
            </option>
          );
        })}
      </select>
    </span>
  );
}
