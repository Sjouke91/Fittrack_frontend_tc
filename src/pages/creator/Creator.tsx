import "./Creator.scss";
import React, { useEffect, useState, MouseEvent } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllExercises,
  getExercisesBySearch,
} from "../../store/exercises/actions";
import { importAllExercises } from "../../store/exercises/selectors";
import { selectMuscleGroups } from "../../store/muscleGroups/selectors";
import { Button, Form } from "react-bootstrap";
import {
  ExerciseSubmit,
  ParamTypes,
  Search,
  MuscleGroup,
} from "../../modelTypes";
import TextInput from "react-bootstrap/Button";
import { getMuscleGroups } from "../../store/muscleGroups/actions";

export default function Workout() {
  const allExercises = useSelector(importAllExercises);
  const allMuscleGroups = useSelector(selectMuscleGroups);
  const dispatch = useDispatch();
  const [offSet, set_offSet] = useState(0);

  useEffect(() => {
    dispatch(getAllExercises(offSet));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMuscleGroups());
  }, [dispatch]);

  const onClickDispatch = (e: MouseEvent) => {
    e.preventDefault();
    set_offSet(offSet + 50);
    dispatch(getAllExercises(offSet));
  };

  const onSelectDispatch = (e: string) => {
    const selectedMuscleGroup = allMuscleGroups.find((mg) => mg.name === e);
    if (selectedMuscleGroup) {
      dispatch(getExercisesBySearch(selectedMuscleGroup.id));
    }
  };

  return (
    <div className="creatorPage">
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
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Search by muscle group</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                onSelectDispatch(e.target.value);
              }}
            >
              <option>Pick a muscle group...</option>
              {allMuscleGroups.map((mg) => {
                return <option key={mg.id}>{mg.name}</option>;
              })}
            </Form.Control>
          </Form.Group>
        </Form.Group>
        <Form.Group>
          <Form.Label>Add exercises:</Form.Label>
        </Form.Group>
        <div className="exerciseList">
          {allExercises.map((e, i) => {
            return (
              <div className="exerciseCard" key={i}>
                <p>{}</p>
                <p>{`${e.id}.  ${e.name}`}</p>
                <p>{e.muscleGroup.name}</p>
              </div>
            );
          })}
        </div>
        <button onClick={(e) => onClickDispatch(e)}>Get more exercises</button>
      </Form>
    </div>
  );
}
