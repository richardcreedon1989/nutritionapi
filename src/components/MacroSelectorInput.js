import React from "react";
import { Input } from "reactstrap";

const MacroSelectorInput = ({ nutritionHandler, styling, id }) => {
  return (
    <>
      <Input
        type="number"
        id={id}
        onChange={(e) => nutritionHandler(e.target.value, id)}
      />
    </>
  );
};

export default MacroSelectorInput;
