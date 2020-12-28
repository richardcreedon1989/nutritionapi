import React from "react";
import { Input } from "reactstrap";

const MacroSelectorInput = ({ nutritionHandler, styling, id }) => {
  return (
    <>
      <Input
        style={{ width: "50%" }}
        type="number"
        id={id}
        onChange={(e) => nutritionHandler(e.target.value, id)}
      />
    </>
  );
};

export default MacroSelectorInput;
