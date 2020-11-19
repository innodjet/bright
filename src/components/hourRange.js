import React from "react";

const HourRange = ({ list, defaultValue, isHourRangeChange, target, day }) => {
  const displayData = (data, defaultValue) => {
    return data.map((el) => {
      if (defaultValue === el) {
        return (
          <option value={el} defaultValue={defaultValue} key={el}>
            {el}
          </option>
        );
      }
      return (
        <option value={el} key={el}>
          {el}
        </option>
      );
    });
  };

  return (
    <div className="col-auto my-1">
      <select
        className="custom-select"
        value={defaultValue}
        onChange={(evt) => isHourRangeChange(evt, target, day)}
        id="inlineFormCustomSelect"
      >
        {displayData(list, defaultValue)}
      </select>
    </div>
  );
};

export default HourRange;
