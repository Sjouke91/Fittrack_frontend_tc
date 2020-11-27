import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../../components/Dashboard/Calendar/Calendar";
import Graph from "../../components/Dashboard/Graph/Graph";
import WorkoutHistory from "../../components/Dashboard/WorkoutHistory/WorkoutHistory";
import { getLoggedExercises } from "../../store/exercises/actions";
import { selectAppLoading } from "../../store/appState/selectors";

export default function Dashboard() {
  const dispatch = useDispatch();
  const state = useSelector(selectAppLoading);

  const [workoutId, set_workoutId] = useState(0);

  useEffect(() => {
    dispatch(getLoggedExercises());
  }, [dispatch]);

  const updateWorkoutId = (workoutId: number) => {
    set_workoutId(workoutId);
  };

  return (
    <div className="dashboardPage">
      <div className="header">
        <h2>Your results!</h2>
      </div>
      {state ? (
        <p>loading</p>
      ) : (
        <div>
          <div className="dashboardComponent">
            <h5>Calendar</h5>
            <Calendar />
          </div>
          <div className="dashboardComponent">
            <h5>Workout History</h5>
            <WorkoutHistory updateWorkoutId={updateWorkoutId} />
          </div>
          <div className="dashboardComponent">
            <h5>Graph feature</h5>
            <Graph workoutId={workoutId} />
          </div>
        </div>
      )}
    </div>
  );
}
