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
  const [searchText, set_searchText] = useState("");
  const [searchMuscleGroup, set_searchMuscleGroup] = useState("");

  useEffect(() => {
    dispatch(getAllExercises(offSet));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMuscleGroups());
  }, [dispatch]);

  // const onClickDispatch = (e: MouseEvent) => {
  //   e.preventDefault();
  //   set_offSet(offSet + 50);
  //   dispatch(getAllExercises(offSet));
  // };

  const onClickSearch = (e: MouseEvent) => {
    e.preventDefault();

    if (searchMuscleGroup === "Pick a muscle group...") {
      set_searchMuscleGroup("");
    }

    if (searchMuscleGroup) {
      const selectedMuscleGroup = allMuscleGroups.find(
        (mg) => mg.name === searchMuscleGroup
      );
      if (selectedMuscleGroup) {
        dispatch(getExercisesBySearch(selectedMuscleGroup.id, searchText));
      }
      return;
    }
    dispatch(getExercisesBySearch(searchMuscleGroup, searchText));
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
          <Form.Control
            type="text"
            placeholder="Exercise name"
            onChange={(e) => set_searchText(e.target.value)}
            value={searchText}
          />
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Search by muscle group</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                set_searchMuscleGroup(e.target.value);
              }}
            >
              <option>Pick a muscle group...</option>
              {allMuscleGroups.map((mg) => {
                return <option key={mg.id}>{mg.name}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <button onClick={(e) => onClickSearch(e)}>Search exercise</button>
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
      </Form>
    </div>
  );
}
