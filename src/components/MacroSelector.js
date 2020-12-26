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
    displayMacroGrams();
  }; //passes macros up to App component to allow for calculation for calories total/remaining etc

  useEffect(() => {
    setDailyCalories(props.dailyCalorieSelector);
    console.log("usefefect");
  }, [props]);

  const displayMacroGrams = (props) => {
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

  const displayProtein = () => {
    return dailyMacroGrams ? (
      <div className="total-macro-display">{dailyMacroGrams.protein} Grams</div>
    ) : (
      ""
    );
  };

  const displayCarbs = () => {
    return dailyMacroGrams ? (
      <div className="total-macro-display">{dailyMacroGrams.carbs} Grams</div>
    ) : (
      ""
    );
  };

  const displayFat = () => {
    return dailyMacroGrams ? (
      <div className="total-macro-display">{dailyMacroGrams.fat} Grams</div>
    ) : (
      ""
    );
  };

  return (
    <Form className="padding-bottom">
      <h4>Calorie Setter</h4>
      <hr />
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="protein">
            <h6> Protein%: </h6>
          </label>
          <MacroSelectorInput
            id="protein"
            nutritionHandler={nutritionHandler}
          />
          {displayProtein(dailyMacroGrams)}
        </div>
        <div className="form-group">
          <label htmlFor="carbs">
            {" "}
            <h6> Carbs%:</h6>
          </label>
          <MacroSelectorInput nutritionHandler={nutritionHandler} id="carbs" />
          {displayCarbs(dailyMacroGrams)}
        </div>
        <div className="form-group" style={{ display: "inlineBlock" }}>
          <label htmlFor="fat">
            {" "}
            <h6> Fat%:</h6>
          </label>
          <MacroSelectorInput nutritionHandler={nutritionHandler} id="fat" />
          {displayFat(dailyMacroGrams)}
        </div>
      </div>
      <div className="calculate-button-div">
        <Button
          className="calculate-button"
          type="submit"
          onClick={(e) => macrosHandler(e)}
        >
          Calculate
        </Button>
      </div>
      <img src={macroImage} />
      {/* {displayMacroGrams}
      <div style={{ marginLeft: "10%" }}>
        {`Total Protein: `}
        {props.remainingMacros.carbs}
      </div>
      <div style={{ marginLeft: "10%" }}>{props.remainingMacros.fat}</div>
      <div style={{ marginLeft: "10%" }}>{props.remainingMacros.protein}</div> */}
    </Form>
  ); // Button above - Enter on fat input clicks calculate button when pass in event + stop refresh + type is submit
};

export default MacroSelector;
