import { useReducer } from "react";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todo-data") || "[]"),
  hideUnchecked: false,
  handleCompleted: false,
  theme: localStorage.getItem("todo-theme") || "dark",
  inputValue: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Typing":
      return { ...state, inputValue: action.value };
    case "Submitvalue":
      if (state.inputValue === "") return state;
      const data = JSON.parse(localStorage.getItem("todo-data") || "[]");
      const newItem = {
        id: state.todos.length,
        text: state.inputValue,
        checked: false,
      };
      data.push(newItem);

      localStorage.setItem("todo-data", JSON.stringify(data));
      return { ...state, todos: [...state.todos, newItem], inputValue: "" };

    case "checkboxchange":
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.value) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
      localStorage.setItem("todo-data", JSON.stringify(updatedTodos));
      return { ...state, todos: updatedTodos };

    case "active-list":
      return { ...state, hideUnchecked: true, handleCompleted: true };
    case "all-list":
      return { ...state, hideUnchecked: false, handleCompleted: false };
    case "complete-list":
      return { ...state, hideUnchecked: true, handleCompleted: false };

    case "theme":
      localStorage.setItem(
        "todo-theme",
        state.theme === "dark" ? "light" : "dark"
      );
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };

    case "remove-todo":
      const removeUpdatedTodos = state.todos.filter(
        (todo) => todo.id !== action.value
      );
      localStorage.setItem(
        "todo-data",
        JSON.stringify(
          removeUpdatedTodos.map((todo, index) => ({ ...todo, id: index }))
        )
      );
      return {
        ...state,
        todos: removeUpdatedTodos,
      };
    case "clear-complete":
      const clearComplete = state.todos.filter((todo) => !todo.checked);
      const clearCompleteTodo = clearComplete.map((todo, index) => ({
        ...todo,
        id: index,
      }));
      localStorage.setItem("todo-data", JSON.stringify(clearCompleteTodo));
      return {
        ...state,
        todos: clearCompleteTodo,
      };
    case "drag-drop":
      // Ignore drop outside droppable container
      const dropp = action.value;
      if (!dropp.destination) return state;
      var updatedList = [...state.todos];
      // Remove dragged item
      const [reorderedItem] = updatedList.splice(dropp.source.index, 1);
      // Add dropped item
      updatedList.splice(dropp.destination.index, 0, reorderedItem);
      // Update State
      localStorage.setItem(
        "todo-data",
        JSON.stringify(
          updatedList.map((todo, index) => ({ ...todo, id: index }))
        )
      );
      return { ...state, todos: updatedList };

    default:
      return state;
  }
};

export default function useCustomHook() {
  const [todoState, dispatch] = useReducer(reducer, initialState);

  const handleTyping = (e) => {
    dispatch({ type: "Typing", value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "Submitvalue" });
  };

  const handleCheckboxChange = (id) => {
    dispatch({ type: "checkboxchange", value: id });
  };

  const handleActive = () => {
    dispatch({ type: "active-list" });
  };

  const handleAll = () => {
    dispatch({ type: "all-list" });
  };

  const handleComplete = () => {
    dispatch({ type: "complete-list" });
  };

  const toggleTheme = () => {
    dispatch({ type: "theme" });
  };

  const handleRemoveTodo = (id) => {
    dispatch({ type: "remove-todo", value: id });
  };

  const clearComplete = () => {
    dispatch({ type: "clear-complete" });
  };

  const filteredTodos = todoState.hideUnchecked
    ? todoState.handleCompleted
      ? todoState.todos.filter((todo) => !todo.checked)
      : todoState.todos.filter((todo) => todo.checked)
    : todoState.todos;

  const uncheckedCount = todoState.todos.filter((todo) => !todo.checked).length;

  const handleDrop = (droppedItem) => {
    dispatch({ type: "drag-drop", value: droppedItem });
  };

  return [
    todoState.hideUnchecked,
    todoState.handleCompleted,
    todoState.theme,
    todoState.inputValue,
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
