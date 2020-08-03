import React from "react";
import { Progress } from "reactstrap";

const NutrientRatio = (props) => {
  return (
    <div>
      <Progress multi>
        <Progress bar color="success" value="40">
          {" "}
          Protein %
        </Progress>
        <Progress bar color="warning" value="40">
          {" "}
          Carbs
        </Progress>
        <Progress bar color="danger" value="20">
          {" "}
          Fat{" "}
        </Progress>
      </Progress>
    </div>
  );
};

export default NutrientRatio;
