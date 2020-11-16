// src/components/TodoItem.tsx
import React from "react";
import { Item } from "../model";

type Props = {
  // we should receive a todo item object
  item: Item;

  // and a function that we don't have to give
  //  anything, and doesn't return anything either
  //  (it "just does" something)
  toggleDone: () => void;

  // ..and maybe we'll add some more stuff later,
  //  this will be enough for now
};

export default function TodoItem(props: Props) {
  const style: string = props.item.isDone ? "none" : "line-through";

  return (
    <div>
      <div>
        <button onClick={() => props.toggleDone()}>
          {props.item.isDone ? "( )" : "X"}
        </button>
      </div>
      <p
        style={{
          textDecorationLine: style,
        }}
      >
        {props.item.text}
      </p>
      {props.item.tags.map((i, index) => {
        return <p key={index}>{i}</p>;
      })}
    </div>
  );
}
