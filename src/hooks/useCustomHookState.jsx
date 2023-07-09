import { useState } from "react";

export default function useCustomHookState() {
  const initialValue = () => {
    return JSON.parse(localStorage.getItem("todo-data") || "[]");
  };

  const [todos, setTodos] = useState(initialValue);
  const [hideUnchecked, setHideUnchecked] = useState(false);
  const [handleCompleted, setHandleCompleted] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [inputValue, setInputValue] = useState("");

  const handleTyping = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("todo-data") || "[]");
    const newItem = {
      id: todos.length,
      text: inputValue,
      checked: false,
    };
    setTodos([...todos, newItem]);
    data.push(newItem);

    localStorage.setItem("todo-data", JSON.stringify(data));

    setInputValue("");
  };

  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    setTodos((prevTodos) => (prevTodos = updatedTodos));
    localStorage.setItem("todo-data", JSON.stringify(updatedTodos));
  };

  const handleActive = () => {
    setHideUnchecked(true);
    setHandleCompleted(true);
  };

  const handleAll = () => {
    setHideUnchecked(false);
    setHandleCompleted(false);
  };

  const handleComplete = () => {
    setHideUnchecked(true);
    setHandleCompleted(false);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);

    localStorage.setItem(
      "todo-data",
      JSON.stringify(
        updatedTodos.map((todo, index) => ({ ...todo, id: index }))
      )
    );
  };

  const clearComplete = () => {
    const clearComplete = todos.filter((todo) => !todo.checked);
    setTodos((prevTodos) =>
      clearComplete.map((todo, index) => ({ ...todo, id: index }))
    );
    localStorage.setItem(
      "todo-data",
      JSON.stringify(
        clearComplete.map((todo, index) => ({ ...todo, id: index }))
      )
    );
  };

  const filteredTodos = hideUnchecked
    ? handleCompleted
      ? todos.filter((todo) => !todo.checked)
      : todos.filter((todo) => todo.checked)
    : todos;

  const uncheckedCount = todos.filter((todo) => !todo.checked).length;

  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...todos];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setTodos(updatedList);
    localStorage.setItem("todo-data", JSON.stringify(updatedList));
  };

  return [
    hideUnchecked,
    handleCompleted,
    theme,
    inputValue,
    handleTyping,
    handleSubmit,
    handleCheckboxChange,
    handleActive,
    handleAll,
    handleComplete,
    toggleTheme,
    handleRemoveTodo,
    clearComplete,
    filteredTodos,
    uncheckedCount,
    handleDrop,
  ];
}
