import "./SelectedExList.scss";
import React, { useState, useEffect, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { selectAllExercises } from "../../store/exercises/selectors";
import { Table, Button } from "react-bootstrap";

export type SelectedEx = {
  exerciseList: number[];
  addExercises: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function SelectedExList(props: SelectedEx) {
  const { exerciseList, addExercises } = props;
  const allExercises = useSelector(selectAllExercises);
  const [marginBottom, set_marginBottom] = useState("50px");
  const [listClosed, set_listClosed] = useState(true);

  useEffect(() => {}, [exerciseList]);

  const closeList = () => {
    set_listClosed(!listClosed);
  };

  useEffect(() => {
    listClosed
      ? set_marginBottom(`${exerciseList.length * -35}px`)
      : set_marginBottom("50px");
  }, [exerciseList, listClosed]);

  const onClickDeleteEx = (e: MouseEvent, exerciseId: number | undefined) => {
    e.preventDefault();
    const newWorkoutArray = exerciseList.filter((eId) => eId !== exerciseId);
    addExercises(newWorkoutArray);
  };

  return (
    <div className="selectedExercises">
      <div className="pullUpList">
        <Button variant="danger" onClick={() => closeList()}>
          {listClosed ? "▲" : "▼"}
        </Button>
      </div>

      <Table
        style={{ marginBottom: marginBottom }}
        striped
        bordered
        hover
        variant="dark"
        size="sm"
      >
        {/* <tbody>
          <tr>
            <td colSpan={3}>
              <Button onClick={() => closeList()}>
                {listClosed ? "▲" : "▼"}
              </Button>
            </td>
          </tr>
        </tbody> */}
        {exerciseList.map((e, i) => {
          const completeExercise = allExercises.find((ex) => ex.id === e);

          return (
            <tbody key={i}>
              <tr>
                <td>{i + 1}</td>
                <td>{completeExercise?.name}</td>
                <td>{completeExercise?.muscleGroup.name}</td>
                <td>
                  <button
                    onClick={(e) => onClickDeleteEx(e, completeExercise?.id)}
                  ></button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}
