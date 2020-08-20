import React, { useState } from "react";
import { Input, Form, Button } from "reactstrap";

const MacroSelector = (props) => {
  const [protein, setProtein] = useState();
  const [carbs, setCarbs] = useState();
  const [fat, setFat] = useState();

  const proteinHandler = (e) => {
    setProtein(e);
  };

  const carbsHandler = (e) => {
    setCarbs(e);
  };

  const fatHandler = (e) => {
    setFat(e);
  };

  const macrosHandler = () => {
    props.macrosHandler({ protein, carbs, fat });
  };

  return (
    <div>
      <Form
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(24, 1fr)",
        }}
      >
        <div
          style={{
            gridColumn: "1/2",
            lineHeight: "1.8",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          Protein{" "}
        </div>
        <Input
          style={{ gridColumn: "2/4", marginRight: "10px" }}
          type="number"
          name="protein"
          onChange={(e) => proteinHandler(e.target.value)}
        />
        <div
          style={{
            gridColumn: "5/6",
            lineHeight: "1.8",
            marginRight: "10px",
          }}
        >
          Carbs{" "}
        </div>
        <Input
          style={{ gridColumn: "6/8", marginRight: "10px" }}
          type="number"
          name="carbs"
          onChange={(e) => carbsHandler(e.target.value)}
        />
        <div
          style={{
            gridColumn: "9/10",
            lineHeight: "1.8",
            marginRight: "10px",
          }}
        >
          Fat{" "}
        </div>
        <Input
          style={{ gridColumn: "10/12" }}
          type="number"
          name="fat"
          onChange={(e) => fatHandler(e.target.value)}
        />

        <Button
          style={{ gridColumn: "14/18" }}
          name="approve"
          onClick={macrosHandler}
        >
          Calculate
        </Button>
      </Form>
    </div>
  );
};

export default MacroSelector;
