import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Xbutton from "../assets/icon-cross.svg";

export default function TodoList(props) {
  const { filteredTodos, handleCheckboxChange, handleRemoveTodo } = props;
  return (
    <Droppable droppableId="list-container">
      {(provided) => (
        <ul
          className="list-container"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {filteredTodos.map((todo, index) => (
            <Draggable
              key={todo.id}
              draggableId={todo.id.toString()}
              index={index}
            >
              {(provided) => (
                <li
                  className="item-container"
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                >
                  <label className="checkbox-container" htmlFor={todo.id}>
                    <input
                      id={todo.id}
                      type="checkbox"
                      checked={todo.checked}
                      onChange={() => handleCheckboxChange(todo.id)}
                    />
                    <span className="checkmark"></span>
                    <span className={`texts ${todo.checked ? "strike" : ""}`}>
                      {todo.text}
                    </span>
                    <img
                      className="xbutton"
                      src={Xbutton}
                      alt="Remove Todo"
                      onClick={() => handleRemoveTodo(todo.id)}
                    />
                  </label>
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
