import React from "react";

export default function DesktopList(props) {
  const {
    uncheckedCount,
    hideUnchecked,
    handleCompleted,
    handleAll,
    handleActive,
    handleComplete,
    clearComplete,
  } = props;
  return (
    <ul>
      <li className="details">
        <div className="items">
          <p>{uncheckedCount} items left</p>
        </div>
        <div className="filter">
          <p
            className={!hideUnchecked && !handleCompleted ? "active" : ""}
            onClick={handleAll}
          >
            All
          </p>
          <p
            className={hideUnchecked && handleCompleted ? "active" : ""}
            onClick={handleActive}
          >
            Active
          </p>
          <p
            className={hideUnchecked && !handleCompleted ? "active" : ""}
            onClick={handleComplete}
          >
            Complete
          </p>
        </div>
        <div className="clear">
          <p onClick={clearComplete}>Clear Completed</p>
        </div>
      </li>
    </ul>
  );
}
