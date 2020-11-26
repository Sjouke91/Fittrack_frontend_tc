import "./WorkoutHistory.scss";
import React, { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectUserExercises } from "../../../store/exercises/selectors";
import * as _ from "lodash";
import { Table } from "react-bootstrap";

export default function WorkoutHistory() {
  const allExercises = useSelector(SelectUserExercises);
  const [index, set_index] = useState(0);
  const [workoutDate, set_workoutDate] = useState("");

  const onClickPrevious = (e: MouseEvent) => {
    set_index(index + 1);
  };
  const onClickNext = (e: MouseEvent) => {
    set_index(index - 1);
  };

  const groupedExercises = _.mapValues(
    _.groupBy(allExercises, "workoutStart"),
    (elist) => elist.map((exercise) => _.omit(exercise, "workoutStart"))
  );

  const newArray = Object.values(groupedExercises);
  const dateArray = Object.keys(groupedExercises);
  const currentExercise = newArray[index];
  const currentWorkoutDate = new Date(dateArray[index]).toDateString();

  return (
    <div className="WorkoutHistoryComponent">
      <div className="scroller">
        <button onClick={(e) => onClickPrevious(e)}>‹</button>
        <div className="scrollerText">
          <p>Scroll workouts</p>
        </div>
        <button onClick={(e) => onClickNext(e)}>›</button>
      </div>
      <div className="exerciseList">
        {currentWorkoutDate !== "Invalid Date" ? currentWorkoutDate : null}
        {currentExercise ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Weight</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>RPE</th>
              </tr>
            </thead>

            {currentExercise.map((e, i) => {
              return (
                <tbody key={e.id}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{e.exercise.name}</td>
                    <td>{e.kg}</td>
                    <td>{e.sets}</td>
                    <td>{e.reps}</td>
                    <td>{e.RPE}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        ) : null}
      </div>
    </div>
  );
}
