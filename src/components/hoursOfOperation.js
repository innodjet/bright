import React, { useState } from "react";
import HourRange from "./hourRange";
import {
  HOUR_OF_OPERATION_MOCK_DATA,
  HOURS_MOCK_DATA,
} from "../mock-data/index";

const HoursOfOperation = () => {
  const [state, setState] = useState({
    displayData: [...HOUR_OF_OPERATION_MOCK_DATA],
    editData: [...HOUR_OF_OPERATION_MOCK_DATA],
    isEdit: false,
    editStatus: {
      isError: false,
      message: "",
    },
    list: [...HOURS_MOCK_DATA],
  });

  const {
    isEdit,
    list,
    editStatus: { isError, message },
  } = state;

  const onIsOpenChange = (day) => {
    setState({
      ...state,
      editData: [
        ...state.editData.map((el) => {
          if (day === el.day) {
            el.isOpen = !el.isOpen;
          }
          return el;
        }),
      ],
    });
  };

  const isHourRangeSame = (target, day, value) => {
    let rep = false;
    const data = state.editData.filter((el) => el.day === day)[0];
    if (
      (target === "end" && data.start === value) ||
      (target === "start" && data.end === value)
    ) {
      rep = true;
    }
    return rep;
  };

  const isHourRangeChange = (evt, target, day) => {
    if (isHourRangeSame(target, day, evt.target.value)) {
      setState({
        ...state,
        editStatus: {
          ...state.editStatus,
          isError: true,
          message: "Start and End hour cannot be the same...",
        },
      });
    } else {
      setState({
        ...state,
        editData: [
          ...state.editData.map((el) => {
            if (day === el.day) {
              if (target === "start") {
                el.start = evt.target.value;
              } else {
                el.end = evt.target.value;
              }
            }
            return el;
          }),
        ],
        editStatus: {
          ...state.editStatus,
          isError: false,
          message: "",
        },
      });
    }
  };

  const displayData = () => {
    const { displayData, editData, isEdit } = state;
    return displayData.map((el, index) => {
      const { day, isOpen, start, end } = isEdit ? editData[index] : el;
      return (
        <div className="row mb-5" key={day}>
          <div className="col-sm-4">{day}</div>
          <div className="col-sm-4">
            {" "}
            {isEdit ? (
              <>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    name={day}
                    className="custom-control-input"
                    checked={isOpen}
                    onChange={() => onIsOpenChange(day)}
                    id={day}
                  />
                  <label className="custom-control-label" htmlFor={day}>
                    {isOpen ? "OPEN" : "CLOSED"}
                  </label>
                </div>
              </>
            ) : isOpen ? (
              "OPEN"
            ) : (
              "CLOSED"
            )}
          </div>
          <div className="col-sm-4">
            {isOpen && !isEdit ? `${start} - ${end}` : ""}
            {isOpen && isEdit ? (
              <>
                <div className="form-row align-items-center">
                  <HourRange
                    list={list}
                    defaultValue={start}
                    target={"start"}
                    day={day}
                    isHourRangeChange={isHourRangeChange}
                  />{" "}
                  -{" "}
                  <HourRange
                    list={list}
                    defaultValue={end}
                    target={"end"}
                    day={day}
                    isHourRangeChange={isHourRangeChange}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    });
  };

  const onCancel = (evt) => {
    evt.preventDefault();
    setState({
      ...state,
      isEdit: false,
    });
  };

  const onEdit = (evt) => {
    evt.preventDefault();
    const dataToUpdate = JSON.parse(JSON.stringify(state.displayData));
    setState({
      ...state,
      editData: dataToUpdate,
      isEdit: true,
    });
  };

  const onSave = (evt) => {
    evt.preventDefault();
    setState({
      ...state,
      displayData: [...state.editData],
      isEdit: false,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 p-4">
          <h2>Hours of Operation</h2>
          Manage standard hours of operation when providers are available to
          provide care. Patients will be informed if they submit an exam outside
          of these hours.
        </div>
        <div className="col-sm-3 p-4">
          {!isEdit ? (
            <button type="button" onClick={onEdit} className="btn btn-link">
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-link mr-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSave}
                className="btn btn-primary"
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
      {isError && message ? (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle"></i> {message}
        </div>
      ) : (
        ""
      )}
      {state && state.displayData ? (
        <div className="container">{displayData()}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HoursOfOperation;
