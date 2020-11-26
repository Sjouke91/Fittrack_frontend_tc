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
import { SelectUserExercises } from "../../../store/exercises/selectors";
import "./Calender.scss";

export default function Test() {
  const currentDate = new Date();
  const allExercises = useSelector(SelectUserExercises);
  const dispatch = useDispatch();

  const newArray = allExercises.filter(
    (v, i, a) =>
      a.findIndex(
        (t) =>
          t.workout.id === v.workout.id && t.workoutStart === v.workoutStart
      ) === i
  );

  const schedulerData = newArray.map((e) => {
    return {
      startDate: e.workoutStart,
      endDate: e.createdAt,
      title: e.workout.name,
    };
  });

  useEffect(() => {
    dispatch(getAllExercises());
  }, [dispatch]);

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
