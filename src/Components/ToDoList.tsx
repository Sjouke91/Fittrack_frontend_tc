import React, { useState } from "react";

import { Item } from "../model"; // we need to import the type
import TodoItem from "./ToDoItem";

export default function TodoList() {
  // note the <Item[]> syntax!
  const [list, setList] = useState<Item[]>([
    {
      id: 0,
      text: "Make this app",
      tags: ["react", "typescript"],
      isDone: false,
    },
    {
      id: 1,
      text: "Fall in love with TypeScript",
      tags: ["romantic", "typescript"],
      isDone: true,
    },
  ]);
  const [requiredTags, setRequiredTags] = useState<string[]>([]);
  const tags = Array.from(new Set(list.map((item) => item.tags).flat()));

  console.log(tags);

  const toggle = (id: number) => {
    const newList = list.map((i) => {
      if (i.id === id) {
        return { ...i, isDone: !i.isDone };
      }
      return i;
    });
    setList(newList);
  };

  const onClickSelect = (t: string) => {
    console.log("I got clicked", t);
    if (requiredTags.includes(t)) {
      const newArray = requiredTags.filter((tag) => tag !== t);
      setRequiredTags(newArray);
      return;
    }
    setRequiredTags([...requiredTags, t]);
  };

  console.log(requiredTags);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>Filter on tags: </p>
        {tags.map((t, i) => {
          const isRequired = requiredTags.includes(t) ? "bold" : "normal";
          console.log(isRequired);
          return (
            <button onClick={() => onClickSelect(t)}>
              <p style={{ margin: "5px", fontWeight: isRequired }} key={i}>
                {t}
              </p>
            </button>
          );
        })}
      </div>
      <div>
        {list.map((item, i) => {
          const showItem = item.tags.filter((t) => requiredTags.includes(t));

          if (showItem) {
            return (
              <TodoItem
                key={item.id}
                item={item}
                toggleDone={() => toggle(item.id)}
              />
            );
          }
          return;
        })}
      </div>
    </div>
  );
}
