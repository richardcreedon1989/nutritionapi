//Make the Form be in the App component and the div in the Searcher component but still allow to submit from the Searcher component

import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Searcher from "./components/Searcher";

import MacroSelector from "./components/MacroSelector";
import FoodTable from "./components/FoodTable";
import Chart from "./components/Chart";
import Slider from "./components/Slider";

import { Label, Input, Form, Container } from "reactstrap";

import Nav from "./components/Nav";
const App = (props) => {
  const [dailyCalorieSelector, setDailyCalorieSelector] = useState(1800);

  const [foodItemDetails, setFoodItemDetails] = useState([]);

  const [sumOfFoodItems, setSumOfFoodItems] = useState({
    protein: 0,
    carbs: 0,
    calories: 0,
    fat: 0,
  });

  // const [caloriesForMacros, setCaloriesForMacros] = useState();

  const [remainingMacros, setRemainingMacros] = useState({
    protein: 0,
    fat: 0,
    carbs: 0,
  });

  const [dailyMacroBreakdown, setDailyMacroBreakdown] = useState({
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const removeRow = (props) => {
    let deletedRowNewArray = foodItemDetails.filter((row) => {
      return row.id !== props.id;
    });
    setFoodItemDetails(deletedRowNewArray);

    setSumOfFoodItems({
      fat: sumOfFoodItems.fat - props.fat,
      protein: sumOfFoodItems.protein - props.protein,
      carbs: sumOfFoodItems.carbs - props.carbs,
      calories: sumOfFoodItems.calories - props.calories,
    });
  };

  const macrosHandler = (props) => {
    setDailyMacroBreakdown(props);

    console.log("remaining", remainingMacros);
    // setCaloriesForMacros(dailyCalorieSelector);
  };

  useEffect(() => {
    const proteinCalories =
      (dailyCalorieSelector * (dailyMacroBreakdown.protein / 100)) / 4;
    const carbsCalories =
      (dailyCalorieSelector * (dailyMacroBreakdown.carbs / 100)) / 4;
    const fatCalories =
      (dailyCalorieSelector * (dailyMacroBreakdown.fat / 100)) / 9;

    setRemainingMacros({
      protein: proteinCalories,
      carbs: carbsCalories,
      fat: fatCalories,
    });
  }, [dailyMacroBreakdown, dailyCalorieSelector]);

  const setCalorieHandler = (e) => {
    setDailyCalorieSelector(e.target.value);
  };

  const onSearchSubmit = async (props) => {
    let data = { title: props, ingr: [props] }; //ingr = ingredients list + title required
    await axios
      .post(
        `https://api.edamam.com/api/nutrition-details?app_id=8b84adef&app_key=a931603d6a495dba409096cbf9eb7f71`,
        data
      )
      .then((response) => {
        console.log(response);
        setFoodItemDetails([
          ...foodItemDetails,
          {
            name: props,
            id: uuidv4(),
            fat: response.data.totalNutrients.FAT.quantity.toFixed(),
            protein: response.data.totalNutrients.PROCNT.quantity.toFixed(),
            carbs: response.data.totalNutrients.CHOCDF.quantity.toFixed(),
            calories: response.data.calories,
          },
        ]);

        setSumOfFoodItems({
          fat:
            sumOfFoodItems.fat +
            parseInt(response.data.totalNutrients.FAT.quantity.toFixed()),
          protein:
            sumOfFoodItems.protein +
            parseInt(response.data.totalNutrients.PROCNT.quantity.toFixed()),
          carbs:
            sumOfFoodItems.carbs +
            parseInt(response.data.totalNutrients.CHOCDF.quantity.toFixed()),
          calories: sumOfFoodItems.calories + response.data.calories,
        });
        console.log("sumoffood", sumOfFoodItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Nav />
      <div className="formStyle">
        <Slider
          dailyCalorieSelector={dailyCalorieSelector}
          setCalorieHandler={setCalorieHandler}
        />
        <MacroSelector
          className="padding-bottom"
          macrosHandler={macrosHandler}
        />

        <div className="displayGrid">
          <div style={{ gridColumn: "3/21" }}>
            <Searcher
              className="padding-bottom"
              onSearchSubmit={onSearchSubmit}
            />
          </div>
        </div>

        <FoodTable
          foodItemDetails={foodItemDetails}
          sumOfFoodItems={sumOfFoodItems}
          removeRow={removeRow}
          dailyCalorieSelector={dailyCalorieSelector}
          remainingMacros={remainingMacros}
        />
      </div>
    </Container>
  );
};

export default App;

// const isInitialMount = useRef(true);
// useEffect(() => {
//   if (isInitialMount.current) {
//     isInitialMount.current = false;
//   } else {
//     console.log("displayedInfoUseEffect", displayedInfo);
//   }
// }, [displayedInfo]);
