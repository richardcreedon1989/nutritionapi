import React, { useState } from "react";
import Slider from "react-rangeslider";

const Sliders = () => {
  const [volume, setVolume] = useState(40);

  const handleOnChange = (value) => {
    console.log("value slider", value);
    setVolume(value);
  };

  return (
    <Form>
      <Label for="volume">
        {`Select Daily Calorie Intake: ${dailyCalorieSelector}`}
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
    </Form>
  );
};

export default Sliders;
