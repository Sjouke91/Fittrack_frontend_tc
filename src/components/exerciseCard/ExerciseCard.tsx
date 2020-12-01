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
        ></button>
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
