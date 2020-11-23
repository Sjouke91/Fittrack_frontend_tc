import "./Workout.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExercises, submitExercise } from "../../store/exercises/actions";
// import { getStats, resetExerciseStats } from "../../store/stats/actions";
import { importExercises } from "../../store/exercises/selectors";
import { Button } from "react-bootstrap";
import { ExerciseSubmit, ParamTypes } from "../../modelTypes";
import { type } from "os";
// import { selectStats } from "../../store/stats/selectors";
// import Timer from "../../components/Timer/Timer";
// import ExerciseStats from "../../components/ExerciseStats/ExerciseStats";

export default function Workout() {
  const { id } = useParams<ParamTypes>();
  const workoutId = parseInt(id);
  const dispatch = useDispatch();
  const allExercises = useSelector(importExercises);
  const [showStats, setShowStats] = useState(false);
  const [finishExercise, setFinishExercise] = useState<ExerciseSubmit>({
    id: null,
    reps: null,
    sets: null,
    kg: null,
    RPE: null,
  });

  useEffect(() => {
    dispatch(getExercises(workoutId));
  }, [dispatch, workoutId]);

  const onClickSubmit = (id: number) => {
    setFinishExercise({ ...finishExercise, id });
    dispatch(submitExercise(finishExercise));
    setFinishExercise({
      id: null,
      reps: null,
      sets: null,
      kg: null,
      RPE: null,
    });
  };

  console.log("this is all", allExercises);
  // const onClickLog = (id) => {
  //   showStats ? dispatch(resetExerciseStats()) : dispatch(getStats(id));
  //   setShowStats(!showStats);
  // };

  return (
    <div className="exercisePage">
      <div className="header">
        <h2>Good luck!</h2>
      </div>
      <div className="allExercises">
        <div className="exerciseList">
          {allExercises.map((e, i) => {
            return (
              <div key={e.id} className="exerciseCard">
                <div className="exerciseTitle">
                  <p>{i + 1}</p>
                  <p>{e.name}</p>
                </div>
                <div className="exerciseInput">
                  <input
                    type="number"
                    placeholder="reps"
                    onChange={(e) => {
                      setFinishExercise({
                        ...finishExercise,
                        reps: parseInt(e.target.value),
                      });
                    }}
                    value={finishExercise.reps}
                  ></input>
                  <input
                    type="number"
                    placeholder="sets"
                    onChange={(e) => {
                      setFinishExercise({
                        ...finishExercise,
                        sets: parseInt(e.target.value),
                      });
                    }}
                    value={finishExercise.sets}
                  ></input>
                  <input
                    type="number"
                    placeholder="kg"
                    onChange={(e) => {
                      setFinishExercise({
                        ...finishExercise,
                        kg: parseInt(e.target.value),
                      });
                    }}
                    value={finishExercise.kg}
                  ></input>
                  <input
                    type="number"
                    placeholder="rpe"
                    onChange={(e) => {
                      setFinishExercise({
                        ...finishExercise,
                        RPE: parseInt(e.target.value),
                      });
                    }}
                    value={finishExercise.RPE}
                  ></input>
                </div>
                {/* {allStats.map((s, i) => {
                  return (
                    <div key={i} className="allStats">
                      <p>{s.date}</p>
                      <p>{`reps: ${s.reps}`}</p>
                      <p>{`sets: ${s.sets}`}</p>
                      <p>{`kg: ${s.kg}`}</p>
                      <p>{`rpe: ${s.RPE}`}</p>
                    </div>
                  );
                })} */}
                <div className="buttons">
                  {/* <Button id="button" onClick={() => onClickLog(e.id)}>
                    Stats
                  </Button> */}
                  <Button id="button" onClick={() => onClickSubmit(e.id)}>
                    Finish
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="timerDiv">{/* <Timer /> */}</div>
    </div>
  );
}
