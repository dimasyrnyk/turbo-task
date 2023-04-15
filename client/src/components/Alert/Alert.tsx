import "./Alert.scss";
import { IAlert, AlertColors } from "../../types/app";

export default function Alert({ text, error }: IAlert) {
  const classes = error ? AlertColors.RED : AlertColors.GREEN;

  return <div className={"alert__text_" + classes}>{text}</div>;
}
