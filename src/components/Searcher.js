import React, { useState } from "react";
import { Input, Form } from "reactstrap";
import "./searcher.css";

const Searcher = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchSubmit = (e) => {
    e.preventDefault();
    props.onSearchSubmit(searchTerm);
    setSearchTerm("");
  };

  const searchChangeHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ marginTop: "1em" }}>
      <h4 className="macro-selector-heading"> Food Searcher </h4>
      <hr className="macro-selector-hr" />
      <div
        style={{
          margin: "0 1em",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <p>
          To work out the amount of calories you consume per day, enter the
          consumed food item and its weights in the search box below
        </p>
        <p>
          Then we will query our nutritional database and find the calories for
          the food item, as well as the carbs, protein, and fats
        </p>
        <p>
          {" "}
          Lastly, we will then remove the food item from the total calories and
          macros you have set previously
        </p>
      </div>
      <hr className="hr-inputs" />
      <p
        style={{
          margin: "1 0 1em",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Enter the food item and its weights below
        <i> e.g. 100g chicken or 200ml milk </i>
      </p>
      <Form onSubmit={onSearchSubmit} className="padding-bottom">
        <Input
          type="text"
          placeholder="Enter food and grams"
          value={searchTerm}
          onChange={searchChangeHandler}
        />
      </Form>
    </div>
  );
};

export default Searcher;
