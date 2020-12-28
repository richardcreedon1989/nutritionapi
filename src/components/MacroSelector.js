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
    <div style={{ textAlign: "center" }} className=" macro-setter-parent-div ">
      <h4 className="macro-selector-heading">Macro-nutrient Profile</h4>
      <hr />
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
            <div className="total-macro-display">
              {" "}
              {displayProtein(dailyMacroGrams)}{" "}
            </div>
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
            <div className="total-macro-display">
              {displayCarbs(dailyMacroGrams)}
            </div>
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
            <div className="total-macro-display">
              {displayFat(dailyMacroGrams)}
            </div>
          </div>
        </div>

        <Button
          style={{
            marginTop: "3.75em",
            display: "inline",
            width: "40%",
          }}
          className="calculate-button"
          id="button"
          type="submit"
          onClick={(e) => macrosHandler(e)}
        >
          Calculate
        </Button>
      </Form>

      <div style={{ float: "none", clear: "both" }}>
        <p> lorem ipsum </p>
        <p> lorem ipsum </p>
        <p> lorem ipsum </p>
        <p> lorem ipsum </p>
      </div>
      {/* <img className="macro-setter-image" src={macroImage} /> */}
    </div>
  ); // Button above - Enter on fat input clicks calculate button when pass in event + stop refresh + type is submit
};

export default MacroSelector;
