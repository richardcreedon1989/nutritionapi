//Make the Form be in the App component and the div in the Searcher component but still allow to submit from the Searcher component
//CSS Grid is not responsive right now - look in to auto fit/fill
import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Container } from "reactstrap";

import Searcher from "./components/Searcher";
import MacroSelector from "./components/MacroSelector";
import FoodTable from "./components/FoodTable";
import Slider from "./components/Slider";

const App = (props) => {
  const [dailyCalorieSelector, setDailyCalorieSelector] = useState(1800); //Slider Bar Value
  const [foodItemDetails, setFoodItemDetails] = useState([]); //Stored response from API call with searchterm/calories/fat/protein/carbs.iud

  const [sumOfFoodItems, setSumOfFoodItems] = useState({
    protein: 0,
    carbs: 0,
    calories: 0,
    fat: 0,
  }); //Total Macros of all foods searched and not removed

  const [remainingMacros, setRemainingMacros] = useState({
    protein: 0,
    fat: 0,
    carbs: 0,
  }); //DailyMacrosAllowed - sumOfFoodItems so far

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
  }; //Remove row when user selectes delete option. props.id coming from FoodTable component

  const macrosHandler = (props) => {
    const { protein, carbs, fat } = props;
    const proteinCalories = (dailyCalorieSelector * (protein / 100)) / 4;
    const carbsCalories = (dailyCalorieSelector * (carbs / 100)) / 4;
    const fatCalories = (dailyCalorieSelector * (fat / 100)) / 9;

    setRemainingMacros({
      protein: proteinCalories,
      carbs: carbsCalories,
      fat: fatCalories,
    });
  };
  //receives the % macros set in MacroSelector component
  //and multiples by each macros calorie per gram to work out calories for each macro

  const setCalorieHandler = (props) => {
    setDailyCalorieSelector(props.target.value);
  }; //Setting total daily calories. Passed from Slider component

  const onSearchSubmit = async (props) => {
    let data = { title: props, ingr: [props] }; //ingr = ingredients list + title required
    await axios
      .post(
        `https://api.edamam.com/api/nutrition-details?app_id=8b84adef&app_key=a931603d6a495dba409096cbf9eb7f71`,
        data
      )
      .then((response) => {
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
        ]); //Storing searched item and its individuak nutritional info in App state alongside previously searched items to dispaly in the FoodTable component rows

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
        }); //Adding the NB NB calories here may be not neccessary as its not used - additionally where we work out the calories elsewhere may not be useful eithert
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <h1 className="nav">Nutrition Calculator</h1>
      <div className="formStyle">
        <Slider
          dailyCalorieSelector={dailyCalorieSelector}
          setCalorieHandler={setCalorieHandler}
        />
        <h1> Select Macronutrients as a % of overall diet </h1>

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
