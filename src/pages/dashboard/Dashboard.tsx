import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../../components/Dashboard/Calendar/Calendar";
import WorkoutHistory from "../../components/Dashboard/WorkoutHistory/WorkoutHistory";
import { getLoggedExercises } from "../../store/exercises/actions";
import { selectAppLoading } from "../../store/appState/selectors";
import { selectToken } from "../../store/user/selectors";
import { Redirect } from "react-router-dom";
import WorkoutGraph from "../../components/Dashboard/Graph/WorkoutGraph";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import ExerciseGraph from "../../components/Dashboard/Graph/ExerciseGraph";
import Switches from "../../components/Switch";

export default function Dashboard() {
  const dispatch = useDispatch();
  const state = useSelector(selectAppLoading);
  const userWithToken = useSelector(selectToken);
  const [graphType, set_graphType] = useState(true);

  if (!userWithToken) {
    <Redirect to="/login" />;
  }

  const [workoutId, set_workoutId] = useState(0);

  useEffect(() => {
    console.log("this is run");
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
            <div className="graphTitle">
              <h5>Graph feature </h5>
              <div className="graphSwitch">
                <Switches graphType={graphType} setGraph={set_graphType} />
              </div>
            </div>
            {graphType ? (
              <ExerciseGraph workoutId={workoutId} />
            ) : (
              <WorkoutGraph workoutId={workoutId} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
