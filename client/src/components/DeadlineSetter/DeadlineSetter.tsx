import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DeadlineSetter(props: any) {
  const getFormattedDate = () => {
    const s = props.date.split("/");
    return [s[1], s[0], s[2]].join("/");
  };
  const [startDate, setStartDate] = useState(
    props.date ? getFormattedDate() : new Date()
  );

  const handleChange = (date: Date) => {
    setStartDate(date);

    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(date);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
    props.onChange(`${da}/${mo}/${ye}`);

    // let y = date.getFullYear();
    // let m = date.getMonth() + 1;
    // let d = date.getDate();
    // this.props.onChange(`${m > 9 ? m : "0" + m}/${d > 9 ? d : "0" + d}/${y} `);
  };

  return (
    <span className="modal__row">
      <span className="row__title">Дедлайн:</span>
      <DatePicker
        id="date"
        className="modal__select"
        selected={new Date(startDate)}
        onChange={handleChange}
        name="startDate"
        dateFormat="dd/MM/yyyy"
      />
    </span>
  );
}
