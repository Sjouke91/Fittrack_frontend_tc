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
  const [marginBottomButton, set_marginBottomButton] = useState("60px");
  const [listClosed, set_listClosed] = useState(true);

  useEffect(() => {}, [exerciseList]);

  const closeList = () => {
    set_listClosed(!listClosed);
  };

  useEffect(() => {
    listClosed
      ? set_marginBottom(`${exerciseList.length * -45}px`)
      : set_marginBottom("50px");
    !listClosed
      ? set_marginBottomButton(`${exerciseList.length * 50 + 60}px`)
      : set_marginBottomButton("60px");
  }, [exerciseList, listClosed]);

  const onClickDeleteEx = (e: MouseEvent, exerciseId: number | undefined) => {
    e.preventDefault();
    const newWorkoutArray = exerciseList.filter((eId) => eId !== exerciseId);
    addExercises(newWorkoutArray);
  };

  return (
    <div className="selectedExercises">
      <div className="pullUpList" style={{ bottom: marginBottomButton }}>
        <Button
          style={{ color: "white" }}
          variant="danger"
          onClick={() => closeList()}
        >
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
        {exerciseList.map((e, i) => {
          const completeExercise = allExercises.find((ex) => ex.id === e);

          return (
            <tbody key={i}>
              <tr>
                <td>{i + 1}</td>
                <td>{completeExercise?.name}</td>
                <td>{completeExercise?.muscleGroup.name}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-warning"
                    className="deleteButton"
                    onClick={(e) => onClickDeleteEx(e, completeExercise?.id)}
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
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}
