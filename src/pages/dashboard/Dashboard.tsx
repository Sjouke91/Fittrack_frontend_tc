import React, { useEffect } from "react";
import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import Calander from "../../components/Dashboard/Calander/Calander";
import Graph from "../../components/Dashboard/Graph/Graph";
import WorkoutHistory from "../../components/Dashboard/WorkoutHistory/WorkoutHistory";
import { getAllExercises } from "../../store/exercises/actions";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExercises());
  }, [dispatch]);

  return (
    <div className="dashboardPage">
      <div className="header">
        <h2>Your results!</h2>
      </div>
      <h5>Calender</h5>
      <Calander />
      <h5>Workout History</h5>
      <WorkoutHistory />
      <h5>Graph feature</h5>
      <Graph />
    </div>
  );
}
