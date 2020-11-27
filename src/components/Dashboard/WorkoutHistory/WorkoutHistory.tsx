import "./WorkoutHistory.scss";
import React, { MouseEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectLoggedExercises } from "../../../store/exercises/selectors";
import * as _ from "lodash";
import { Table } from "react-bootstrap";

type Props = {
  updateWorkoutId: (workoutId: number) => void;
};

export default function WorkoutHistory(props: Props) {
  const { updateWorkoutId } = props;
  const allLoggedExercises = useSelector(SelectLoggedExercises);
  const [index, set_index] = useState(0);

  const selectedWorkoutArray = allLoggedExercises.length
    ? allLoggedExercises[index].exercises
    : [];
  const selectedWorkoutDate = allLoggedExercises.length
    ? new Date(allLoggedExercises[index].date).toDateString()
    : "";

  useEffect(() => {
    if (selectedWorkoutArray && selectedWorkoutArray.length) {
      // current.reduce --> result unique workoutId
      updateWorkoutId(selectedWorkoutArray[0].workout.id);
    }
  }, [selectedWorkoutArray]);

  const onClickPrevious = () => {
    if (index + 1 < allLoggedExercises.length) {
      set_index(index + 1);
    }
  };

  const onClickNext = () => {
    if (index > 0) {
      set_index(index - 1);
    }
  };

  return (
    <div className="WorkoutHistoryComponent">
      <div className="scroller">
        <button className="backwardButton" onClick={() => onClickPrevious()}>
          ‹
        </button>
        <div className="scrollerText">
          <p>
            {selectedWorkoutDate !== "Invalid Date"
              ? selectedWorkoutDate
              : null}
          </p>
        </div>
        <button className="forwardButton" onClick={() => onClickNext()}>
          ›
        </button>
      </div>
      <div className="exerciseTable">
        {selectedWorkoutArray ? (
          <Table striped bordered hover size="sm">
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

            {selectedWorkoutArray.map((e, i) => {
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
