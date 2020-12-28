import React, { useState, useEffect } from "react";
import { Button, Form } from "reactstrap";
import { toast } from "react-toastify";
import MacroSelectorInput from "./MacroSelectorInput";
import macroImage from "../../src/images/macro-image.jpg";

import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons";

toast.configure();

const MacroSelector = (props) => {
  const [macro, setMacro] = useState({ protein: 0, carbs: 0, fat: 0 });
  const [dailyMacroGrams, setDailyMacroGrams] = useState();
  const [dailyCalories, setDailyCalories] = useState();

  const nutritionHandler = (e, id) => {
    setMacro({ ...macro, [id]: [e] });
  }; //sets % user wants for each of the macros

  console.log("macroProps", props);

  const macrosHandler = (e) => {
    e.preventDefault();
    const { protein, fat, carbs } = macro;
    fat && protein && carbs && props.macrosHandler({ protein, carbs, fat });
    parseInt(carbs) + parseInt(protein) + parseInt(fat) !== 100 &&
      toast.error("Must add up to 100%");
    macroGramsSetter();
  }; //passes macros up to App component to allow for calculation for calories total/remaining etc

  useEffect(() => {
    setDailyCalories(props.dailyCalorieSelector);
    console.log("usefefect");
  }, [props]);

  const macroGramsSetter = (props) => {
    const { protein, fat, carbs } = macro;
    const proteinGrams = (dailyCalories * (protein / 100)) / 4;
    const carbGrams = (dailyCalories * (carbs / 100)) / 4;
    const fatGrams = (dailyCalories * (fat / 100)) / 9;
    setDailyMacroGrams({
      protein: proteinGrams,
      carbs: carbGrams,
      fat: fatGrams,
    });
  }; //used to calculate the grams for each macro from the total daily calories selected x the macro's %

  const displayMacroGrams = () => {
    return dailyMacroGrams ? (
      <div>
        <p className="total-macro-display">
          {`Your daily allowance of protein is ${dailyMacroGrams.protein}g. Healthy sources of protein include fish, grains, and chicken.`}
        </p>
        <p className="total-macro-display">
          {" "}
          {`Your daily allowance of carbohydrates is ${dailyMacroGrams.carbs}g. Healthy sources of carbohydrates include grains, lentils, fruit, and vegetables.`}
        </p>

        <p className="total-macro-display">{`Your daily allowance of fat is ${dailyMacroGrams.fat}g. Healthy sources of fats include avocados, egg yolk, nuts, and seeds `}</p>
      </div>
    ) : (
      ""
    );
  };

  return (
    <div style={{ textAlign: "center" }} className=" macro-setter-parent-div ">
      <h4 className="macro-selector-heading">Macro-nutrient Profile</h4>
      <hr />
      <div style={{ textAlign: "left", marginLeft: "1em" }}>
        <p>
          {" "}
          Macronutrients are the nutrients we need in larger quantities that
          provide us with energy.
        </p>
        <p>
          There are seven major classes of nutrients:
          <ul>
            <li> Carbohydrates </li>
            <li> Dietary Fiber </li>
            <li> Fats </li>
            <li> Minerals </li>
            <li> Proteins </li>
            <li> Vitamins </li>
            <li> Water </li>
          </ul>
        </p>
      </div>
      <Form className="form-container">
        <div style={{ display: "inline", width: "50%", float: "left" }}>
          <div className="form-group">
            <label className="input-label" htmlFor="protein">
              <h6> Protein%: </h6>
            </label>
            <MacroSelectorInput
              className="macro-input"
              id="protein"
              nutritionHandler={nutritionHandler}
            />
          </div>
          <div className="form-group">
            <label className="input-label" htmlFor="carbs">
              <h6> Carbs%:</h6>
            </label>
            <MacroSelectorInput
              className="macro-input"
              nutritionHandler={nutritionHandler}
              id="carbs"
            />
          </div>
          <div className="form-group">
            <label className="input-label" htmlFor="fat">
              <h6> Fat%:</h6>
            </label>
            <MacroSelectorInput
              className="macro-input"
              nutritionHandler={nutritionHandler}
              id="fat"
            />
          </div>
        </div>

        <Button
          style={{
            marginTop: "3.5em",
            display: "inline",
            width: "40%",
            height: "3em",
          }}
          className="calculate-button"
          id="button"
          type="submit"
          onClick={(e) => macrosHandler(e)}
        >
          Calculate
        </Button>

        {displayMacroGrams(dailyMacroGrams)}
      </Form>

      {/* <img className="macro-setter-image" src={macroImage} /> */}
    </div>
  ); // Button above - Enter on fat input clicks calculate button when pass in event + stop refresh + type is submit
};

export default MacroSelector;
