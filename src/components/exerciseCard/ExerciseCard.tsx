import "./ExerciseCard.scss";
import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch } from "react-redux";
import { deleteExerciseFromWorkout } from "../../store/workouts/actions";

type Props = {
  id: number;
  name: string;
  index: number;
  exerciseId: number;
  setExState: (id: number, key: string, value: number) => void;
};

export default function ExerciseCard(props: Props) {
  const { id: workoutId, name, index, exerciseId, setExState } = props;
  const dispatch = useDispatch();

  const deleteExercise = { workoutId, exerciseId };

  return (
    <div className="exerciseInputCard">
      <div className="exerciseTitle">
        <p>{index + 1}</p>
        <p>{name}</p>
        <button
          onClick={(e) =>
            confirmAlert({
              title: "Confirm delete",
              message: "Are you sure you want to delete this exercise.",
              buttons: [
                {
                  label: "Yes",
                  onClick: () =>
                    dispatch(deleteExerciseFromWorkout(deleteExercise)),
                },
                {
                  label: "No",
                  onClick: () => null,
                },
              ],
            })
          }
          className="deleteButton"
        >
          {" "}
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
        </button>
      </div>
      <div className="exerciseInput">
        <input
          type="number"
          placeholder="reps"
          onChange={(e) => {
            setExState(exerciseId, "reps", parseInt(e.target.value));
          }}
          required
        ></input>
        <input
          type="number"
          placeholder="sets"
          onChange={(e) => {
            setExState(exerciseId, "sets", parseInt(e.target.value));
          }}
        ></input>
        <input
          type="number"
          placeholder="kg"
          onChange={(e) => {
            setExState(exerciseId, "kg", parseInt(e.target.value));
          }}
          required
        ></input>
        <input
          type="number"
          placeholder="rpe"
          onChange={(e) => {
            setExState(exerciseId, "RPE", parseInt(e.target.value));
          }}
          required
        ></input>
      </div>
      <div className="buttons"></div>
    </div>
  );
}
