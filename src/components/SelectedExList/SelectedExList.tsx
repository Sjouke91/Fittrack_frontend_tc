import "./SelectedExList.scss";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllExercises } from "../../store/exercises/selectors";
import { Table } from "react-bootstrap";

export type SelectedEx = {
  exerciseList: number[];
};

export default function SelectedExList(props: SelectedEx) {
  const { exerciseList } = props;
  const allExercises = useSelector(selectAllExercises);
  const [marginBottom, set_marginBottom] = useState("50px");
  const [listClosed, set_listClosed] = useState(true);

  useEffect(() => {}, [exerciseList]);

  const closeList = () => {
    set_listClosed(!listClosed);
  };

  useEffect(() => {
    listClosed
      ? set_marginBottom(`${exerciseList.length * -35 + 50}px`)
      : set_marginBottom("50px");
  }, [exerciseList, listClosed]);

  return (
    <div className="selectedExercises" style={{ marginBottom: marginBottom }}>
      <Table striped bordered hover variant="dark" size="sm">
        <tbody>
          <tr>
            <td colSpan={3}>
              <button onClick={() => closeList()}>^</button>
            </td>
          </tr>
        </tbody>
        {exerciseList.map((e, i) => {
          const completeExercise = allExercises.find((ex) => ex.id === e);

          return (
            <tbody key={i}>
              <tr>
                <td>{i + 1}</td>
                <td>{completeExercise?.name}</td>
                <td>{completeExercise?.muscleGroup.name}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}
