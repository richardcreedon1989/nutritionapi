import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [food, setFood] = useState([{}]);
  const clickHandler = () => {
    axios
      .get(
        "https://api.edamam.com/api/food-database/v2/parser?ingr=chicken&app_id=ba0b87de&app_key=732bfc784e2dcb31ec0774cf6dcdb02e"
      )
      .then((response) => {
        setFood(response.data.hints); //.food.nutrients
        console.log(response, "response");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderList = () => {
    if (food) {
      return food.map((items) => {
        return `${items.food.label} = ${items.food.nutrients.ENERC_KCAL} KCal`;
      });
    }
  };
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log("food", food);
      console.log("food breakdown", food[0].food.label);
      console.log(
        "map",
        food.map((items) => {
          return `${items.food.label} = ${items.food.nutrients.ENERC_KCAL} KCal`;
        })
      );
    }
  }, [food]);

  return (
    <div>
      <button onClick={clickHandler}> </button>
      {renderList}
    </div>
  );
}

export default App;
