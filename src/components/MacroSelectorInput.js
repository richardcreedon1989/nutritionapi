import React from "react";
import { Input } from "reactstrap";

const MacroSelectorInput = ({ nutritionHandler, styling, id }) => {
  return (
    <div>
      <Input
        style={styling}
        type="number"
        width="100%"
        id={id}
        onChange={(e) => nutritionHandler(e.target.value, id)}
      />
    </div>
  );
};

export default MacroSelectorInput;
