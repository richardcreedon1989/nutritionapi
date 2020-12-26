import React from "react";
import { Label, Input } from "reactstrap";
import calorieSelectorImage from "../../src/images/selector-image.jpg";

const Sliders = ({ dailyCalorieSelector, setCalorieHandler }) => {
  return (
    <div className="calorie-setter-parent-div text-center font-weight-light">
      <div style={{ textAlign: "justify" }} className="calorie-setter-div">
        <h4>Calorie Setter</h4>
        <hr />

        <p>
          The amount of calories a person burns each day is known as
          <strong> TDEE </strong> or <i>Total Daily Energy Expenditure </i>.
        </p>
        <p>
          TDEE varies depending on your weight, gender, height, and body
          composition. To work out your TDEE click
          <a href="https://tdeecalculator.net/"> here</a>{" "}
        </p>
        <p>
          Use the slider to increase/decrease the amount of calories you wish to
          consume per day
        </p>

        <Label for="volume" style={{ marginBottom: "2em" }}></Label>

        <input
          style={{ textAlign: "center !important" }}
          className="slider"
          type="range"
          id="volume"
          name="volume"
          min="800"
          max="6000"
          step="10"
          value={dailyCalorieSelector}
          onChange={setCalorieHandler}
        />

        <h5
          style={{
            display: "inline",
            marginLeft: "1em",
            alignContent: "center !important",
          }}
        >
          {dailyCalorieSelector}
        </h5>
      </div>
      <div className="inline-display">
        <img className="calorie-slider-image" src={calorieSelectorImage} />{" "}
      </div>
    </div>
  );
};

export default Sliders;
