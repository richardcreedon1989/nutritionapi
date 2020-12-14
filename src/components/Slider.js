import React from "react";
import { Label, Input } from "reactstrap";

const Sliders = ({ dailyCalorieSelector, setCalorieHandler }) => {
  return (
    <div className="padding-bottom">
      <Label for="volume">{`Select Daily Calorie Intake: ${dailyCalorieSelector}`}</Label>

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
