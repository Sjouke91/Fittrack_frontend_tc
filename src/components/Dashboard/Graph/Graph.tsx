import "./Graph.scss";
import React, { MouseEvent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SelectUserExercises } from "../../../store/exercises/selectors";
import * as _ from "lodash";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  workoutId: number;
};

export default function Graph(props: Props) {
  const { workoutId } = props;
  const allLoggedExercises = useSelector(SelectUserExercises);
  const [index, set_index] = useState(0);

  const exercisesOfDisplayedWorkout = allLoggedExercises[workoutId];

  const cleanDateExerciseArray = exercisesOfDisplayedWorkout
    ? exercisesOfDisplayedWorkout.map((e) => {
        let shortDate = new Date(e.createdAt).toDateString();

        shortDate = shortDate.substring(0, shortDate.length - 4);
        return { ...e, createdAt: shortDate };
      })
    : [];

  const groupedByExId = _.mapValues(
    _.groupBy(cleanDateExerciseArray, "exercise.id")
  );

  const groupedByExName = _.mapValues(
    _.groupBy(cleanDateExerciseArray, "exercise.name")
  );

  const exerciseArray = Object.values(groupedByExId);
  const exerciseNameArray = Object.keys(groupedByExName);
  const nameData = exerciseNameArray[index];

  const data = exerciseArray[index];

  const onClickPrevious = (e: MouseEvent) => {
    if (index + 1 < exerciseArray.length) {
      set_index(index + 1);
    }
  };
  const onClickNext = (e: MouseEvent) => {
    if (index > 0) {
      set_index(index - 1);
    }
  };

  useEffect(() => {
    set_index(0);
  }, [workoutId]);

  return (
    <div className="graphComponent">
      <div className="scroller">
        <button onClick={(e) => onClickPrevious(e)}>‹</button>
        <div className="scrollerText">
          <p>{nameData}</p>
        </div>
        <button onClick={(e) => onClickNext(e)}>›</button>
      </div>
      <ResponsiveContainer width="95%" height={220}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="kg" stroke="#173F5F" />
          <Line type="monotone" dataKey="reps" stroke="#3CAEA3" />
          <Line type="monotone" dataKey="sets" stroke="#ED553B" />
          <Line type="monotone" dataKey="RPE" stroke="#20639B" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="createdAt" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
