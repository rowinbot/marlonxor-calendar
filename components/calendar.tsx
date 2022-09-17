import * as React from "react";
import dayjs from "dayjs";
import { ButtonHTMLAttributes } from "react";
import dayjsEs from "dayjs/locale/es";

dayjs.locale(dayjsEs);

function CalendarButton(
  props: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">
) {
  return (
    <button
      className="bg-black text-white rounded-lg py-2 px-4 hover:bg-slate-800 hover:shadow-lg active:shadow-sm active:bg-slate-900 transition-shadow duration-75 ease-in-out"
      {...props}
    />
  );
}

type CalendarProps = {
  currentDate: dayjs.Dayjs;
  onDateChange: (date: dayjs.Dayjs) => void;
};
export function Calendar(props: CalendarProps) {
  const today = dayjs(props.currentDate);
  const week = Array(7)
    .fill(0)
    .map((_, i) => today.clone().set("day", i));
  // Create an array with all the days in the month for the current date' month. Something like today.clone().set("d", 31) but for every day in the month.
  const daysInMonth: dayjs.Dayjs[] = [];

  // In these event handlers call `props.onDateChange` with the new date
  // Check out the method `.set()` from the dayjs library to change the month to a previous or next one
  const onPrev = () => console.log("handle prev action here");
  const onNext = () => console.log("handle next action here");

  return (
    <div className="w-[400px] border-2 border-black p-4 rounded-xl">
      <div className="flex items-center text-center mb-2">
        <CalendarButton onClick={onPrev}>Anterior</CalendarButton>
        <div className="flex-1">{today.format("YYYY")}</div>
        <CalendarButton onClick={onNext}>Siguiente</CalendarButton>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center items-center">
        {week.map((day) => (
          <div key={day.format("YYYY-MM-DD")}>
            <span className="font-medium">{day.format("ddd")}</span>
          </div>
        ))}
        {/* Loop through daysInMonth using .map here! */}
        {/* Bonus, render every item in the array as a button and place an onClick handler to be able to change `currentDate` with the button's date, like: <button onClick={() => props.onDateChange(day)}>{day.format(...)}</> */}
      </div>
    </div>
  );
}

export function CalendarContainer() {
  // use React.useState to store the current date. destructure the return like: `const [currentDate, setCurrentDate] = React.useState(...)`
  const currentDate = dayjs();
  const currentMonthDays = currentDate.daysInMonth();

  const onDateChange = (newDate: dayjs.Dayjs) => {
    // call `setCurrentDate` here with `newDate`
    console.log("change currentDate here");
  };

  return (
    <div>
      <p>
        {"La fecha seleccionada es: " +
          currentDate.format("dddd DD [de] MMMM [del] YYYY")}{" "}
      </p>
      <p>{"El mes seleccionado tiene tantos días: " + currentMonthDays} </p>
      <Calendar currentDate={currentDate} onDateChange={onDateChange} />
    </div>
  );
}
