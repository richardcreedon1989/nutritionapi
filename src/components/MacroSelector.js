import React, { useState } from "react";
import { Input, Form, Button } from "reactstrap";
import { toast } from "react-toastify";
import MacroSelectorInput from "./MacroSelectorInput";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

const MacroSelector = (props) => {
  const [protein, setProtein] = useState();
  const [carbs, setCarbs] = useState();
  const [fat, setFat] = useState();

  const nutritionHandler = (e, id) => {
    if (id === "protein") {
      setProtein(e);
    } else if (id === "carbs") {
      setCarbs(e);
    } else if (id === "fat") {
      setFat(e);
    }
  }; //sets % user wants for each of the macros

  const macrosHandler = () => {
    fat && protein && carbs && props.macrosHandler({ protein, carbs, fat });
    parseInt(carbs) + parseInt(protein) + parseInt(fat) !== 100 &&
      toast.error("Must add up to 100%");
  }; //passes macros up to App component to allow for calculation for calories total/remaining etc

  return (
    <div className="padding-bottom displayGrid rcorners2">
      <label
        htmlFor="protein"
        className="macroSelectorInputs macroGridProteinName"
        style={styles.proteinLabelGridValues}
      >
        Protein%:
      </label>
      <MacroSelectorInput
        id="protein"
        nutritionHandler={nutritionHandler}
        styling={styles.proteinInputComponentStyle} //passing down styling to the input so all are consistent
      />

      <label
        htmlFor="carbs"
        className="macroSelectorInputs"
        style={styles.carbsLabelGridValues}
      >
        Carbs%:
      </label>
      <MacroSelectorInput
        nutritionHandler={nutritionHandler}
        styling={styles.carbsInputComponentStyle}
        id="carbs"
      />

      <label
        htmlFor="fat"
        className="macroSelectorInputs"
        style={styles.fatLabelGridValues}
      >
        Fat%:
      </label>
      <MacroSelectorInput
        nutritionHandler={nutritionHandler}
        styling={styles.fatInputComponentStyle}
        id="fat"
      />

      <Button style={styles.macroButton} name="approve" onClick={macrosHandler}>
        Calculate
      </Button>
    </div>
  );
};

const styles = {
  proteinLabelGridValues: {
    gridColumn: "2/3",
  },
  carbsLabelGridValues: {
    gridColumn: "4/5",
  },
  fatLabelGridValues: {
    gridColumn: "6/7",
  },
  macroButton: {
    gridColumn: "12/16",
  },
  proteinInputComponentStyle: {
    width: "4em",
    marginRight: "1em",
  },
  carbsInputComponentStyle: {
    width: "4em",
    marginRight: "1em",
  },
  fatInputComponentStyle: {
    width: "4em",
    marginRight: "-50px",
  },
};

export default MacroSelector;
