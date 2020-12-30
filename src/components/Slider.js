import React from "react";
import { Label, Input } from "reactstrap";
import calorieSelectorImage from "../../src/images/selector-image.jpg";

const Sliders = ({ dailyCalorieSelector, setCalorieHandler }) => {
  return (
    <div className="calorie-setter-parent-div text-center font-weight-light">
      <div className="calorie-setter-div">
        <h4 className="calorie-setter-heading">Calorie Setter</h4>
        <hr className="calorie-setter-hr" />
        <div
          style={{
            textAlign: "center",
            marginLeft: ".5em",
            marginRight: ".5em",
          }}
        >
          <p>
            The amount of calories a person burns each day varies depending on
            your weight, gender, height, and body composition. To work out your
            TDEE click
            <a href="https://tdeecalculator.net/"> here</a> .
          </p>

          <hr className="hr-inputs" />
          <p
            style={{
              textAlign: "center",
              paddingTop: "1em",
            }}
          >
            Use the slider to increase/decrease the amount of calories you wish
            to consume per day
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <Label for="volume"></Label>

          <input
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
      </div>
      <div className="image-div">
        <img className="calorie-slider-image" src={calorieSelectorImage} />{" "}
      </div>
    </div>
  );
};

export default Sliders;
