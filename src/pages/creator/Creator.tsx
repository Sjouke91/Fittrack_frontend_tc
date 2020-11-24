import "./Creator.scss";
import React, { useEffect, useState, MouseEvent } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllExercises } from "../../store/exercises/actions";
import { importAllExercises } from "../../store/exercises/selectors";
import { Button, Form } from "react-bootstrap";
import { ExerciseSubmit, ParamTypes } from "../../modelTypes";
import TextInput from "react-bootstrap/Button";

export default function Workout() {
  const allExercises = useSelector(importAllExercises);
  const dispatch = useDispatch();
  const [offSet, set_offSet] = useState(0);

  useEffect(() => {
    dispatch(getAllExercises(offSet));
  }, [dispatch]);

  console.log("this is all ex", allExercises);

  const onClickDispatch = (e: MouseEvent) => {
    console.log("click", offSet);
    e.preventDefault();
    set_offSet(offSet + 50);
    dispatch(getAllExercises(offSet));
  };

  return (
    <div className="exercisePage">
      <div className="header">
        <h2>Create your workout!</h2>
      </div>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name of workout</Form.Label>
          <Form.Control type="text" placeholder="Enter workoutname" />
        </Form.Group>

        <Form.Group controlId="formSearchText">
          <Form.Label>Search by name</Form.Label>
          <Form.Control type="text" placeholder="Exercise name" />
          <Form.Label>Search by muscle group</Form.Label>
          <Form.Control type="text" placeholder="Muscle group" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Add exercises:</Form.Label>
        </Form.Group>
        {allExercises.map((e, i) => {
          return (
            <div
              key={e.id}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <p>{i + 1}</p>
              <p>{e.name}</p>
            </div>
          );
        })}
        <button onClick={(e) => onClickDispatch(e)}>Get more exercises</button>
      </Form>
    </div>
  );
}
