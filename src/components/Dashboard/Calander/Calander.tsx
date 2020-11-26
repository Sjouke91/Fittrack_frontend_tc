import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  MonthView,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { getAllExercises } from "../../../store/exercises/actions";
import { SelectUserWorkouts } from "../../../store/exercises/selectors";
import "./Calender.scss";

export default function Test() {
  const currentDate = new Date();
  const schedulerData = useSelector(SelectUserWorkouts);

  console.log("This is schedule", schedulerData);

  return (
    <div className="calenderComponent">
      <Paper>
        <Scheduler data={schedulerData} height={400} firstDayOfWeek={1}>
          <ViewState currentDate={currentDate} />
          <MonthView></MonthView>
          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
}
