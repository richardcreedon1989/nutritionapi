import React, { useState } from "react";
import { Button, Label } from "reactstrap";
import { toast } from "react-toastify";
import MacroSelectorInput from "./MacroSelectorInput";

import "react-toastify/dist/ReactToastify.css";

//display inline needed to be in the macroselector input so need to have the media query include that too
//created a div and made that display:block below - pushed the next label to the new line
//but may not be the ideal way. also will need to add margin etc to make it line up
//placing button as inline at end of carbs div doesnt work as when click tab it brings to
//button before fat input - potentially need position absolute or one of those thinsg
//copy all below into the proper macro component that is set up properly
toast.configure();

const MacroTester = (props) => {
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
    <div className="padding-bottom">
      <div style={{ display: "block" }}>
        <Label
          style={{
            display: "inlineBlock",
            flexDirection: "column",
            width: "10%",
            marginRight: "20%",
          }}
          // style={{
          //   marginRight: "3%",
          //   marginLeft: "10%",
          // }}
          htmlFor="protein1"
        >
          Protein%:
        </Label>

        <MacroSelectorInput
          id="protein1"
          nutritionHandler={nutritionHandler}
          //passing down styling to the input so all are consistent
        />
      </div>
      <div style={{ display: "inline" }}>
        <Label
          style={{
            display: "inlineBlock",
            flexDirection: "column",
            width: "10%",
            marginRight: "20%",
          }}
          htmlFor="carbs"
        >
          Carbs%:
        </Label>
        <MacroSelectorInput nutritionHandler={nutritionHandler} id="carbs" />
      </div>

      <div style={{ display: "block" }}>
        <Label
          htmlFor="fat"
          style={{
            display: "inlineBlock",
            flexDirection: "column",
            width: "10%",
            marginRight: "20%",
          }}
        >
          Fat%:
        </Label>
        <MacroSelectorInput nutritionHandler={nutritionHandler} id="fat" />
      </div>
      <Button
        onClick={macrosHandler}
        style={{
          width: "30%",
          marginRight: "2%",
          marginLeft: "2%",
          // height: "90%",
        }}
      >
        Calculate
      </Button>
    </div>
  );
};

export default MacroTester;
