import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../../components/Dashboard/Calendar/Calendar";
import WorkoutHistory from "../../components/Dashboard/WorkoutHistory/WorkoutHistory";
import { getLoggedExercises } from "../../store/exercises/actions";
import { selectAppLoading } from "../../store/appState/selectors";
import WorkoutGraph from "../../components/Dashboard/Graph/WorkoutGraph";
import ExerciseGraph from "../../components/Dashboard/Graph/ExerciseGraph";
import Switches from "../../components/Switch";
import Loading from "../../components/loading";

export default function Dashboard() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  const [graphType, set_graphType] = useState(true);

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
      {isLoading ? <Loading /> : null}
      <div>
        <div className="calendarComp">
          <h5>Calendar</h5>
          <Calendar />
        </div>
        <div className="historyComp">
          <h5>Workout History</h5>
          <WorkoutHistory updateWorkoutId={updateWorkoutId} />
        </div>
        <div className="graphComp">
          <div className="graphTitle">
            <h5>Graph</h5>
            <div className="graphSwitch">
              <Switches graphType={graphType} setGraph={set_graphType} />
            </div>
          </div>
          <div className="graphType">
            {graphType ? (
              <ExerciseGraph workoutId={workoutId} />
            ) : (
              <WorkoutGraph workoutId={workoutId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
