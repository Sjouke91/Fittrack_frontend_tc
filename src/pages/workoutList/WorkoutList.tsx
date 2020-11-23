import "./WorkoutList.scss";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsersWorkouts } from "../../store/workouts/actions";
import { selectUsersWorkouts } from "../../store/workouts/selectors";
import { Button } from "react-bootstrap";

export default function Fitness() {
  const workouts = useSelector(selectUsersWorkouts);
  const dispatch = useDispatch();

  console.log("this is workouts", workouts);

  useEffect(() => {
    dispatch(getUsersWorkouts());
  }, [dispatch]);

  return (
    <div className="workoutPage">
      <div className="header">
        <h2>Previous workouts of user</h2>
      </div>
      <div className="workoutList">
        {workouts.map((w) => {
          return (
            <div key={w.id} className="workoutCard">
              <div className="workoutText">
                <p>{`${w.name}`}</p>
                <p>{`Difficulty: ${w.intensity}`}</p>
              </div>
              <Link to={`/workouts/${w.id}`}>
                <Button>Go!</Button>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="addWorkout">
        <Link to="/creator">
          <Button id="button">+</Button>
        </Link>
      </div>
    </div>
  );
}
