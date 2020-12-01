import "./WorkoutGraph.scss";
import React, { useState } from "react";
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
import { loggedExercise } from "../../../store/exercises/types";
import { Form } from "react-bootstrap";

type Props = {
  workoutId: number;
};

export default function WorkoutGraph(props: Props) {
  const { workoutId } = props;
  const allLoggedExercises = useSelector(SelectUserExercises);
  const [selectGraphInput, set_selectGraphInput] = useState<string>("kg");

  const exercisesOfDisplayedWorkout = allLoggedExercises[workoutId];

  const cleanDateExerciseArray = exercisesOfDisplayedWorkout
    ? exercisesOfDisplayedWorkout.map((e) => {
        let shortDate = new Date(e.createdAt).toDateString();

        shortDate = shortDate.substring(0, shortDate.length - 4);
        return { ...e, createdAt: shortDate };
      })
    : [];

  const groupedByExDate = _.mapValues(
    _.groupBy(cleanDateExerciseArray, "createdAt")
  );

  const sortedGroupedByExDate = Object.entries(groupedByExDate).sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    return dateA.getTime() - dateB.getTime();
  });

  interface newObject {
    [key: string]: any;
  }

  // const weightArray = [
  //   { ex1: 8, ex2: 14, ex3: 16 }, // 6/10/20 -> on this day I lifted 8kg on ex1
  //   { ex1: 10, ex2: 14, ex3: 16 }, // 7/10/20
  //   { ex1: 8, ex2: 14, ex3: 16 }, // 8/10/20
  // ];
  const convertToArrayForGraph = (property: string) => {
    return sortedGroupedByExDate.map(([date, exercises]) => {
      let outputByDate: newObject = {};

      exercises.forEach((exercise) => {
        outputByDate[exercise.exercise.name] =
          exercise[property as keyof loggedExercise];
      });

      return outputByDate;
    });
  };

  const weightArray = convertToArrayForGraph(selectGraphInput);

  const weightArrayWithDate = weightArray.map((a, i) => {
    const date = sortedGroupedByExDate[i][0];
    return { ...a, date };
  });

  const nameData = weightArray.length ? Object.keys(weightArray[0]) : [];

  return (
    <div className="graphComponent">
      <div className="selectOption">
        <Form>
          <Form.Group
            className="searchOption"
            controlId="exampleForm.ControlSelect1"
          >
            <Form.Control
              className="selectField"
              as="select"
              onChange={(e) => {
                set_selectGraphInput(e.target.value);
              }}
              value={selectGraphInput}
            >
              <option value="kg">Weight</option>
              <option value="sets">Sets</option>
              <option value="reps">Repetitions</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div className="graph">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={weightArrayWithDate}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            {nameData.map((e, i) => {
              const lineColor = [
                "#173F5F",
                "#3CAEA3",
                "#ED553B",
                "#20639B",
                "#173F5F",
                "#3CAEA3",
                "#ED553B",
              ];
              return (
                <Line
                  key={i}
                  type="monotone"
                  dataKey={e}
                  stroke={lineColor[i]}
                />
              );
            })}
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
