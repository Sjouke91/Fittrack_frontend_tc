import "./ExerciseCard.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkoutExercises,
  submitExercise,
} from "../../store/exercises/actions";
import { importWorkoutExercises } from "../../store/exercises/selectors";
import { Button } from "react-bootstrap";
import { ExerciseSubmit, ParamTypes, WorkoutState } from "../../modelTypes";

type Props = {
  id: number;
  name: string;
  index: number;
  exerciseId: number;
  setExState: (id: number, key: string, value: number) => void;
};

export default function ExerciseCard(props: Props) {
  const { id: workoutId, name, index, exerciseId, setExState } = props;

  return (
    <div className="exerciseCard">
      <div className="exerciseTitle">
        <p>{index + 1}</p>
        <p>{name}</p>
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
