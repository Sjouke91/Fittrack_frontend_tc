import "./ExerciseCard.scss";
import React from "react";

type Props = {
  id: number;
  name: string;
  index: number;
  exerciseId: number;
  setExState: (id: number, key: string, value: number) => void;
};

export default function ExerciseCard(props: Props) {
  const { name, index, exerciseId, setExState } = props;

  return (
    <div className="exerciseInputCard">
      <div className="exerciseTitle">
        <p>{index + 1}</p>
        <p>{name}</p>
      </div>
      <div className="exerciseInput">
        <input
          type="number"
          placeholder="reps"
          onChange={(e) => {
            setExState(exerciseId, "reps", parseInt(e.target.value));
          }}
          required
        ></input>
        <input
          type="number"
          placeholder="sets"
          onChange={(e) => {
            setExState(exerciseId, "sets", parseInt(e.target.value));
          }}
        ></input>
        <input
          type="number"
          placeholder="kg"
          onChange={(e) => {
            setExState(exerciseId, "kg", parseInt(e.target.value));
          }}
          required
        ></input>
        <input
          type="number"
          placeholder="rpe"
          onChange={(e) => {
            setExState(exerciseId, "RPE", parseInt(e.target.value));
          }}
          required
        ></input>
      </div>
      <div className="buttons"></div>
    </div>
  );
}
