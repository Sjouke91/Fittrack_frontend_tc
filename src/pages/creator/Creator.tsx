import "./Creator.scss";
import React, { useEffect, useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExercisesBySearch,
  getAllExercises,
  emptySearch,
} from "../../store/exercises/actions";
import { importSearchedExercises } from "../../store/exercises/selectors";
import { selectMuscleGroups } from "../../store/muscleGroups/selectors";
import { Button, Form } from "react-bootstrap";
import { getMuscleGroups } from "../../store/muscleGroups/actions";
import { createWorkout } from "../../store/workouts/actions";
import SelectedExList from "../../components/SelectedExList/SelectedExList";
import { useHistory } from "react-router-dom";

export default function Workout() {
  const allExercises = useSelector(importSearchedExercises);
  const allMuscleGroups = useSelector(selectMuscleGroups);
  const dispatch = useDispatch();
  const [searchText, set_searchText] = useState("");
  const [searchMuscleGroup, set_searchMuscleGroup] = useState<string | number>(
    ""
  );
  const [workoutName, set_workoutName] = useState("");
  const [addExercises, set_addExercises] = useState<number[]>([]);
  const history = useHistory();

  useEffect(() => {
    dispatch(getMuscleGroups());
    dispatch(getAllExercises());
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
    set_searchMuscleGroup("");
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
    dispatch(emptySearch());
    set_addExercises([]);
    set_workoutName("");
    set_searchText("");
    history.push("/workouts");
  };

  return (
    <div className="creatorPage">
      <div className="header">
        <h2>Create your workout!</h2>
      </div>
      <Form className="formField">
        <Form.Group className="formName" controlId="formName">
          <Form.Label>Name of workout</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => set_workoutName(e.target.value)}
            value={workoutName}
            placeholder="Enter workoutname"
          />
        </Form.Group>
        <h3>Search exercises</h3>
        <Form.Group className="formSearch" controlId="formSearch">
          <Form.Group className="searchOption" controlId="formSearchText">
            <Form.Label>By name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Exercise name"
              onChange={(e) => set_searchText(e.target.value.toLowerCase())}
              value={searchText}
            />
          </Form.Group>
          <Form.Group
            className="searchOption"
            controlId="exampleForm.ControlSelect1"
          >
            <Form.Label>By muscle group</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                set_searchMuscleGroup(e.target.value);
              }}
              value={searchMuscleGroup}
            >
              <option>Pick a muscle group...</option>
              {allMuscleGroups.map((mg) => {
                return <option key={mg.id}>{mg.name}</option>;
              })}
            </Form.Control>
          </Form.Group>
        </Form.Group>
        <Button onClick={(e) => onClickSearch(e)}>Search exercise</Button>
        <div className="exerciseList">
          {allExercises.map((e, i) => {
            const exerciseId = e.id;
            const exerciseSelected = addExercises.includes(e.id)
              ? "exerciseCardSelected"
              : "exerciseCard";

            return (
              <button
                className={exerciseSelected}
                key={i}
                onClick={(e) => onClickSelect(e, exerciseId)}
              >
                {e.name}
              </button>
            );
          })}
        </div>
      </Form>

      <div className="footer">
        <div className="selectedList">
          {addExercises.length ? (
            <SelectedExList
              exerciseList={addExercises}
              addExercises={set_addExercises}
            />
          ) : null}
        </div>
        <div className="buttonParent">
          <Button onClick={(e) => onClickAddWorkout(e)}>Add workout</Button>
        </div>
      </div>
    </div>
  );
}
