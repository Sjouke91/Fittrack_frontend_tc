import "./Workout.scss";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkoutExercises,
  submitExercise,
  emptySearch,
} from "../../store/exercises/actions";
import { importWorkoutExercises } from "../../store/exercises/selectors";
import { Button } from "react-bootstrap";
import { ExerciseSubmit, ParamTypes, WorkoutState } from "../../modelTypes";
import ExerciseCard from "../../components/exerciseCard/ExerciseCard";
import SearchExercise from "../../components/SearchExercise/SearchExercise";
import { selectAppLoading } from "../../store/appState/selectors";
import Loading from "../../components/loading";
import Timer from "../../components/Timer/Timer";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { confirmAlert } from "react-confirm-alert";
import Spinner from "react-bootstrap/Spinner";

export default function Workout() {
  const { id } = useParams<ParamTypes>();
  const workoutId = parseInt(id);
  const dispatch = useDispatch();
  const allExercises = useSelector(importWorkoutExercises);
  const [workoutStart, set_workoutStart] = useState<Date | null>(null);
  const isLoading = useSelector(selectAppLoading);
  const [workoutState, setWorkoutState] = useState<WorkoutState>([]);
  const [displaySearch, set_displaySearch] = useState(false);
  const history = useHistory();
  const [setTimer, set_setTimer] = useState(false);
  const [duration, set_duration] = useState(90);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getWorkoutExercises(workoutId));
    });
  }, [dispatch, workoutId, displaySearch]);

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
  }, [allExercises, workoutStart, displaySearch, workoutId]);

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
    history.push("/");
  };

  return (
    <div className="exercisePage">
      <div className="header">
        <h2>Good luck!</h2>
      </div>
      {/* {isLoading ? (
        <div className="loading_spinner">
          <Spinner animation="border" variant="warning" />
        </div>
      ) : null} */}
      {setTimer ? <Timer setTimer={set_setTimer} duration={duration} /> : null}
      <div className="allExercises">
        <div className="exerciseList">
          {!workoutStart ? (
            <Button
              variant="warning"
              style={{ color: "white", alignSelf: "center" }}
              onClick={() => set_workoutStart(new Date())}
            >
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
          <Button
            variant="outline-warning"
            onClick={(e) => {
              confirmAlert({
                title: "Confirm submit",
                message: "Are you sure you want to submit",
                buttons: [
                  {
                    label: "Yes",
                    onClick: () => onClickLogWorkout(),
                  },
                  {
                    label: "No",
                    onClick: () => null,
                  },
                ],
              });
            }}
          >
            Finish workout
          </Button>
        </div>
      </div>
      <div className="editWorkout">
        {displaySearch ? (
          <SearchExercise
            displaySearchSetter={set_displaySearch}
            workoutId={workoutId}
          />
        ) : null}
      </div>
      {workoutStart ? (
        <div className="footer">
          <div className="timerComponent">
            <Button variant="warning" onClick={(e) => set_setTimer(true)}>
              <AccessAlarmIcon />
            </Button>
            <input
              type="number"
              placeholder="sec."
              min={0}
              onChange={(e) => {
                set_duration(parseInt(e.target.value));
              }}
              required
            ></input>
          </div>
        </div>
      ) : null}
      <div className="pullUpList">
        {workoutStart ? (
          <Button
            variant="outline-warning"
            onClick={(e) => {
              dispatch(emptySearch());
              set_displaySearch(!displaySearch);
            }}
          >
            {!displaySearch ? "✛" : "▼"}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
