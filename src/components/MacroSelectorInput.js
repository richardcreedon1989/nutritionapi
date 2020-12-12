import React from "react";
import { Input } from "reactstrap";

const MacroSelectorInput = ({ nutritionHandler, styling, id }) => {
  return (
    <div>
      <Input
        className="input-large"
        style={styling}
        type="number"
        width="100%"
        onChange={(e) => nutritionHandler(e.target.value, id)}
      />
    </div>
  );
};

export default MacroSelectorInput;
