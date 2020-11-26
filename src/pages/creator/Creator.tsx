import "./Creator.scss";
import React, { useEffect, useState, MouseEvent } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExercisesBySearch } from "../../store/exercises/actions";
import { importSearchedExercises } from "../../store/exercises/selectors";
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
import { createWorkout } from "../../store/workouts/actions";

export default function Workout() {
  const allExercises = useSelector(importSearchedExercises);
  const allMuscleGroups = useSelector(selectMuscleGroups);
  const dispatch = useDispatch();
  const [offSet, set_offSet] = useState(0);
  const [searchText, set_searchText] = useState("");
  const [searchMuscleGroup, set_searchMuscleGroup] = useState<string | number>(
    ""
  );
  const [workoutName, set_workoutName] = useState("");
  const [addExercises, set_addExercises] = useState<number[]>([]);

  useEffect(() => {
    dispatch(getMuscleGroups());
  }, [dispatch]);

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
        set_searchText("");
      }

      return;
    }
    set_searchText("");
    dispatch(getExercisesBySearch(searchMuscleGroup, searchText));
  };

  const onClickSelect = (e: MouseEvent, exerciseId: number) => {
    e.preventDefault();
    if (!addExercises.includes(exerciseId)) {
      set_addExercises([...addExercises, exerciseId]);
      return;
    }
    const newWorkoutArray = addExercises.filter((eId) => eId !== exerciseId);
    set_addExercises(newWorkoutArray);
  };

  const onClickAddWorkout = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(createWorkout(workoutName, addExercises));
    set_addExercises([]);
    set_workoutName("");
    set_searchText("");
  };

  return (
    <div className="creatorPage">
      <div className="header">
        <h2>Create your workout!</h2>
      </div>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name of workout</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => set_workoutName(e.target.value)}
            value={workoutName}
            placeholder="Enter workoutname"
          />
        </Form.Group>

        <Form.Group controlId="formSearchText">
          <Form.Label>Search by name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Exercise name"
            onChange={(e) => set_searchText(e.target.value.toLowerCase())}
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
          <Button onClick={(e) => onClickSearch(e)}>Search exercise</Button>
        </Form.Group>
        <div className="exerciseList">
          {allExercises.map((e, i) => {
            const exerciseId = e.id;
            const exerciseSelected = addExercises.includes(e.id)
              ? "exerciseCardSelected"
              : "exerciseCard";

            return (
              <button key={i} onClick={(e) => onClickSelect(e, exerciseId)}>
                <div className={exerciseSelected}>
                  <p>{e.name}</p>
                </div>
              </button>
            );
          })}
        </div>
      </Form>
      <div className="buttonParent">
        <Button onClick={(e) => onClickAddWorkout(e)}>Add workout</Button>
      </div>
    </div>
  );
}
