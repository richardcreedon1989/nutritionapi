import React, { useState } from "react";
import { Button } from "reactstrap";
import { toast } from "react-toastify";
import MacroSelectorInput from "./MacroSelectorInput";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

const MacroSelector = (props) => {
  const [macro, setMacro] = useState({ protein: 0, carbs: 0, fat: 0 });

  const nutritionHandler = (e, id) => {
    setMacro({ ...macro, [id]: [e] });
    console.log(macro);
  }; //sets % user wants for each of the macros

  const macrosHandler = () => {
    const { protein, fat, carbs } = macro;
    fat && protein && carbs && props.macrosHandler({ protein, carbs, fat });
    parseInt(carbs) + parseInt(protein) + parseInt(fat) !== 100 &&
      toast.error("Must add up to 100%");
  }; //passes macros up to App component to allow for calculation for calories total/remaining etc

  return (
    <div className="padding-bottom displayGrid ">
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

      <Button style={styles.macroButton} onClick={macrosHandler}>
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
