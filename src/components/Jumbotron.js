import React from "react";
import { Jumbotron, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAppleAlt,
  faCalculator,
  faHandPointer,
  faPercentage,
} from "@fortawesome/free-solid-svg-icons";

const Jumbo = (props) => {
  return (
    <div>
      <Jumbotron>
        <div style={{ marginTop: "-2em" }}>
          <p
            className="text-center font-weight-light"
            style={{ marginTop: "1em" }}
          >
            The NutritionApi App will search for your food and display the
            macros and calories for that food, as well as deduct it from your
            daily allowance.
          </p>
        </div>
        <p className="text-center font-weight-light text-underline">
          {" "}
          <strong>Follow the 4 simple steps below! </strong>
        </p>
        <hr className="text-center" />
        <main className=" font-weight-light" style={{ marginBottom: "-3em" }}>
          <p style={{ marginTop: "2em" }}>
            <span style={{ marginRight: "1em" }}>
              <FontAwesomeIcon icon={faHandPointer} />
            </span>
            First, select the amount of calories you wish to consume per day
            with the slider
          </p>

          <p>
            <span style={{ marginRight: "1em" }}>
              <FontAwesomeIcon icon={faPercentage} />
            </span>
            Next, enter the percentage of your diet that you want to be made up
            of protein, carbohydrates, and fat
          </p>
          <p>
            <span style={{ marginRight: "1em" }}>
              <FontAwesomeIcon icon={faCalculator} />
            </span>
            When done, hit Calculate to work out the grams of each of the macros
          </p>
          <p style={{ paddingBottom: "1.8em" }}>
            <span style={{ marginRight: "1em" }}>
              <FontAwesomeIcon icon={faAppleAlt} />
            </span>
            Lastly, enter the food name and the grams/ml of the food you have
            consumed and hit Enter!
          </p>
        </main>
      </Jumbotron>
    </div>
  );
};

export default Jumbo;
