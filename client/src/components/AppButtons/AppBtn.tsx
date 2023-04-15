import "./Buttons.scss";

export default function AppBtn(props: any) {
  const classes = props.device ? props.device : "";

  return (
    <button
      title={props.title}
      className={"app__button " + classes}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
