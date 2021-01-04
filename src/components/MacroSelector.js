import React, { useState, useEffect } from "react";
import { Button, Form } from "reactstrap";
import { toast } from "react-toastify";
import MacroSelectorInput from "./MacroSelectorInput";
import macroImage from "../../src/images/macro-image.jpg";

import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons";
import "./macroSelector.css";
toast.configure();

const MacroSelector = (props) => {
  const [macro, setMacro] = useState({ protein: 0, carbs: 0, fat: 0 });
  const [dailyMacroGrams, setDailyMacroGrams] = useState();
  const [dailyCalories, setDailyCalories] = useState();

  const nutritionHandler = (e, id) => {
    setMacro({ ...macro, [id]: [e] });
  }; //sets % user wants for each of the macros

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
  }, [props]); //need to access slider calories amount in this component - without useffect = undefined as loading calorie slider before state was set

  const macroGramsSetter = (props) => {
    const { protein, fat, carbs } = macro;
    const proteinGrams = (dailyCalories * (protein / 100)) / 4;
    const carbGrams = (dailyCalories * (carbs / 100)) / 4;
    const fatGrams = (dailyCalories * (fat / 100)) / 9;
    setDailyMacroGrams({
      protein: proteinGrams.toFixed(0),
      carbs: carbGrams.toFixed(0),
      fat: fatGrams.toFixed(0),
    });
  }; //used to calculate the grams for each macro from the total daily calories selected x the macro's %

  const displayMacroGrams = () => {
    return dailyMacroGrams ? (
      <div>
        <hr className="hr-macro-display" />
        <h6 className="total-macro-display">
          <strong> Daily Macro Allowance</strong>
        </h6>
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
    <div className=" MacroSelector-container ">
      <h4 className="macro-selector-heading">Macronutrient Calculator</h4>
      <hr className="macro-selector-hr" />
      <div className="macro-selector-info-div">
        <p>
          Macronutrients are the nutrients we need in larger quantities that
          provide us with energy.
        </p>
        <p>There are seven major classes of nutrients:</p>
        <ul>
          <li> Carbohydrates </li>
          <li> Dietary Fiber </li>
          <li> Fats </li>
          <li> Minerals </li>
          <li style={{ paddingTop: "1em" }}> Proteins </li>
          <li> Vitamins </li>
          <li> Water </li>
        </ul>
      </div>
      <hr className="hr-inputs" />

      <Form className="form-container">
        <p className="macro-selector-p-tag">
          Input the percentage of your diet that you want to be made up of
          protein, carbohydrates, and fat.
        </p>
        <p className="macro-selector-p-tag">
          Hit Enter to see how many grams of each you should be consuming per
          day!
        </p>

        <div className="form-group-container">
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
          className="calculate-button"
          id="button"
          type="submit"
          onClick={(e) => macrosHandler(e)}
        >
          Calculate
        </Button>
      </Form>

      {displayMacroGrams(dailyMacroGrams)}
    </div>
  ); // Button above - Enter on fat input clicks calculate button when pass in event + stop refresh + type is submit
};

export default MacroSelector;
