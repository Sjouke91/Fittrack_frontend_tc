import "./WorkoutList.scss";
import React, { useEffect, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsersWorkouts, deleteWorkout } from "../../store/workouts/actions";
import { selectUsersWorkouts } from "../../store/workouts/selectors";
import { Button } from "react-bootstrap";
import { selectAppLoading } from "../../store/appState/selectors";
import Loading from "../../components/loading";

export default function Fitness() {
  const workouts = useSelector(selectUsersWorkouts);
  const isLoading = useSelector(selectAppLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersWorkouts());
  }, [dispatch]);

  const onClickDelete = (e: MouseEvent, workoutId: number) => {
    e.preventDefault();
    dispatch(deleteWorkout(workoutId));
  };

  return (
    <div className="workoutPage">
      <div className="header">
        <h2>Previous workouts of user</h2>
      </div>
      {isLoading ? <Loading /> : null}
      <div className="workoutList">
        {workouts.map((w) => {
          return (
            <div key={w.id} className="workoutCard">
              <Button
                variant="outline-danger"
                onClick={(e) => onClickDelete(e, w.id)}
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-trash"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </Button>
              <div className="workoutText">
                <p>{`${w.name}`}</p>
              </div>
              <Link to={`/workouts/${w.id}`}>
                <Button id="goButton" variant="outline-success">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-arrow-bar-right"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="addWorkout">
        <Link to="/creator">
          <Button id="button">Create workout</Button>
        </Link>
      </div>
    </div>
  );
}
