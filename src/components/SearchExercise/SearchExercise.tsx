import "./SearchExercise.scss";
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
import { editWorkout } from "../../store/workouts/actions";
import SelectedExList from "../SelectedExList/SelectedExList";
import { useParams } from "react-router-dom";

type Props = {
  workoutId: number;
  displaySearchSetter: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchExercise(props: Props) {
  const allExercises = useSelector(importSearchedExercises);
  const allMuscleGroups = useSelector(selectMuscleGroups);
  const dispatch = useDispatch();
  const [searchText, set_searchText] = useState("");
  const [searchMuscleGroup, set_searchMuscleGroup] = useState<string | number>(
    ""
  );
  const [addExercises, set_addExercises] = useState<number[]>([]);
  const { workoutId, displaySearchSetter } = props;

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
    dispatch(getExercisesBySearch(searchMuscleGroup, searchText));
    set_searchText("");
    set_searchMuscleGroup("");
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

  const onClickAddExercises = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(editWorkout(workoutId, addExercises));
    dispatch(emptySearch());
    displaySearchSetter(false);
    set_addExercises([]);
    set_searchText("");
  };

  return (
    <div className="SearchComponent">
      <h3>Add exercise</h3>
      <Form className="formField">
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

        <div className="buttons">
          <Button onClick={(e) => onClickSearch(e)}>Search</Button>
          {addExercises.length ? (
            <Button onClick={(e) => onClickAddExercises(e)}>
              Add exercise(s)
            </Button>
          ) : null}
        </div>
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
    </div>
  );
}
