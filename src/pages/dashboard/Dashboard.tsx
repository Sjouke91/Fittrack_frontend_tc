import React from "react";

export default function Dashboard() {
  return <div>This is dashboard</div>;
}

// import "./Workout.scss";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getWorkoutExercises,
//   submitExercise,
// } from "../../store/exercises/actions";
// import { importWorkoutExercises } from "../../store/exercises/selectors";
// import { Button } from "react-bootstrap";
// import { ExerciseSubmit, ParamTypes } from "../../modelTypes";

// export default function Workout() {
//   const { id } = useParams<ParamTypes>();
//   const workoutId = parseInt(id);
//   const dispatch = useDispatch();
//   const allExercises = useSelector(importWorkoutExercises);
//   const [finishExercise, setFinishExercise] = useState<ExerciseSubmit>({
//     workoutId: workoutId,
//     id: null,
//     reps: null,
//     sets: null,
//     kg: null,
//     RPE: null,
//   });

//   useEffect(() => {
//     dispatch(getWorkoutExercises(workoutId));
//   }, [dispatch, workoutId]);

//   const onClickSubmit = (id: number) => {
//     console.log("clicked", id);
//     setFinishExercise({ ...finishExercise, id, workoutId });
//     dispatch(submitExercise(finishExercise));
//     setFinishExercise({
//       workoutId: workoutId,
//       id: null,
//       reps: null,
//       sets: null,
//       kg: null,
//       RPE: null,
//     });
//   };

//   console.log(finishExercise);

//   return (
//     <div className="exercisePage">
//       <div className="header">
//         <h2>Good luck!</h2>
//       </div>
//       <div className="allExercises">
//         <div className="exerciseList">
//           {allExercises.map((e, i) => {
//             return (
//               <div key={e.id} className="exerciseCard">
//                 <div className="exerciseTitle">
//                   <p>{i + 1}</p>
//                   <p>{e.name}</p>
//                 </div>
//                 <div className="exerciseInput">
//                   <input
//                     type="number"
//                     placeholder="reps"
//                     onChange={(e) => {
//                       setFinishExercise({
//                         ...finishExercise,
//                         reps: parseInt(e.target.value),
//                       });
//                     }}
//                     value={finishExercise.reps || ""}
//                     required
//                   ></input>
//                   <input
//                     type="number"
//                     placeholder="sets"
//                     onChange={(e) => {
//                       setFinishExercise({
//                         ...finishExercise,
//                         sets: parseInt(e.target.value),
//                       });
//                     }}
//                     value={finishExercise.sets || ""}
//                   ></input>
//                   <input
//                     type="number"
//                     placeholder="kg"
//                     onChange={(e) => {
//                       setFinishExercise({
//                         ...finishExercise,
//                         kg: parseInt(e.target.value),
//                       });
//                     }}
//                     value={finishExercise.kg || ""}
//                     required
//                   ></input>
//                   <input
//                     type="number"
//                     placeholder="rpe"
//                     onChange={(e) => {
//                       setFinishExercise({
//                         ...finishExercise,
//                         RPE: parseInt(e.target.value),
//                       });
//                     }}
//                     value={finishExercise.RPE || ""}
//                     required
//                   ></input>
//                 </div>
//                 <div className="buttons">
//                   <Button id="button" onClick={() => onClickSubmit(e.id)}>
//                     Finish
//                   </Button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
