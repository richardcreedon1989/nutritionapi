import React, { useState } from "react";
import { Input, Form, Button } from "reactstrap";
import { toast } from "react-toastify";
import MacroSelectorInput from "./MacroSelectorInput";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

const MacroSelector = (props) => {
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const nutritionHandler = (e, id) => {
    if (id === "protein") {
      setProtein(e);
    } else if (id === "carbs") {
      setCarbs(e);
    } else if (id === "fat") {
      setFat(e);
    }
  };

  const macrosHandler = () => {
    console.log("protein", protein, "carbs", carbs, "fat", fat);
    fat && protein && carbs && props.macrosHandler({ protein, carbs, fat });
    console.log(fat);
    parseInt(carbs) + parseInt(protein) + parseInt(fat) !== 100 &&
      toast.error("Must add up to 100%");
  };

  return (
    <div className="padding-bottom displayGrid">
      <div className="macroSelectorInputs macroGridProteinName">Protein%</div>
      <MacroSelectorInput
        id="protein"
        nutritionHandler={nutritionHandler}
        styling={styles.proteinInputStyle}
      />

      <div
        className="macroSelectorInputs"
        style={{
          gridColumn: "5/6",
        }}
      >
        Carbs%{" "}
      </div>
      <MacroSelectorInput
        nutritionHandler={nutritionHandler}
        styling={styles.carbsInputStyle}
        id="carbs"
      />

      <div
        className="macroSelectorInputs"
        style={{
          gridColumn: "9/10",
        }}
      >
        Fat%{" "}
      </div>
      <MacroSelectorInput
        nutritionHandler={nutritionHandler}
        styling={styles.fatInputStyle}
        id="fat"
      />

      <Button
        style={{ gridColumn: "14/18" }}
        name="approve"
        onClick={macrosHandler}
      >
        Calculate
      </Button>
    </div>
  );
};

const styles = {
  proteinInputStyle: {
    marginRight: "10px",
    gridColumn: "4/8",
    width: "4em",
  },
  carbsInputStyle: {
    marginRight: "10px",
    gridColumn: "12/16",
    width: "4em",
  },
  fatInputStyle: {
    marginRight: "10px",
    gridColumn: "20/24",
    width: "4em",
  },
};
// const macroSelectorGridColumns = {
//   proteinName: { gridColumn: "1 / 2" },
//   proteinInput: { gridColumn: "2/4" },
// };

export default MacroSelector;
