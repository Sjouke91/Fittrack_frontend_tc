import React from "react";
import { useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import { SelectUserWorkouts } from "../../../store/exercises/selectors";
import "./Calendar.scss";

export default function Calendar() {
  const currentDate = new Date();
  const schedulerData = useSelector(SelectUserWorkouts);

  return (
    <div className="calendarComponent">
      <Paper>
        <Scheduler data={schedulerData} height={400} firstDayOfWeek={1}>
          <ViewState defaultCurrentDate={currentDate} />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
}
