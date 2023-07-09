import React from "react";

export default function MobileList(props) {
  const {
    hideUnchecked,
    handleCompleted,
    handleAll,
    handleActive,
    handleComplete,
  } = props;
  return (
    <li className="mobile-details">
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
    </li>
  );
}
