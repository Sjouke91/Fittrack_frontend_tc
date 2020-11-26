import "./Workout.scss";
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
import ExerciseCard from "../../components/exerciseCard/ExerciseCard";

export default function Workout() {
  const { id } = useParams<ParamTypes>();
  const workoutId = parseInt(id);
  const dispatch = useDispatch();
  const allExercises = useSelector(importWorkoutExercises);
  const [workoutStart, set_workoutStart] = useState<Date | null>(null);

  const [workoutState, setWorkoutState] = useState<WorkoutState>([]);

  useEffect(() => {
    dispatch(getWorkoutExercises(workoutId));
  }, [dispatch, workoutId]);

  useEffect(() => {
    const state: ExerciseSubmit[] = allExercises.map((e) => {
      const newObject = {
        workoutStart: workoutStart,
        workoutId: workoutId,
        id: e.id,
        kg: null,
        sets: null,
        reps: null,
        RPE: null,
      };
      return newObject;
    });
    setWorkoutState(state);
  }, [allExercises, workoutStart]);

  const setExState = (id: number, key: string, value: number) => {
    const newState = workoutState.map((e) => {
      if (e.id === id) {
        return { ...e, [key]: value };
      } else {
        return e;
      }
    });
    setWorkoutState(newState);
  };

  const onClickLogWorkout = () => {
    workoutState.map((w) => dispatch(submitExercise(w)));
  };

  return (
    <div className="exercisePage">
      <div className="header">
        <h2>Good luck!</h2>
      </div>
      <div className="allExercises">
        <div className="exerciseList">
          {!workoutStart ? (
            <Button onClick={() => set_workoutStart(new Date())}>
              Start workout
            </Button>
          ) : (
            allExercises.map((e, i) => {
              return (
                <ExerciseCard
                  key={e.id}
                  id={workoutId}
                  name={e.name}
                  index={i}
                  exerciseId={e.id}
                  setExState={setExState}
                />
              );
            })
          )}
        </div>
        <div className="buttonParent">
          <Button onClick={(e) => onClickLogWorkout()}>Finish workout</Button>
        </div>
      </div>
    </div>
  );
}
