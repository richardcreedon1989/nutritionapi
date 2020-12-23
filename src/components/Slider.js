import React from "react";
import { Label, Input } from "reactstrap";

const Sliders = ({ dailyCalorieSelector, setCalorieHandler }) => {
  return (
    <div className="padding-bottom text-center font-weight-light">
      <Label for="volume">
        {" "}
        <h5>{`Set Calories: ${dailyCalorieSelector}`}</h5>{" "}
      </Label>

      <Input
        type="range"
        id="volume"
        name="volume"
        min="800"
        max="6000"
        step="10"
        value={dailyCalorieSelector}
        onChange={setCalorieHandler}
      />
    </div>
  );
};

export default Sliders;
