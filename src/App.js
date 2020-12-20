//Make the Form be in the App component and the div in the Searcher component but still allow to submit from the Searcher component
//Error handling for no search result - Modal pops up saying sorry?
//use media queries to build up for wider screens
//div containing label and inputs isnt centered on wider screens-figure out how to centre the whole div
//enter key on fat input no longer calculates - must press calculate with mouse - fix
//margin between top of jumbotron and parent div gets too far as screen widens - make into class and change with media query
import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Container, Label, Input } from "reactstrap";

import Searcher from "./components/Searcher";
import MacroSelector from "./components/MacroSelector";
import FoodTable from "./components/FoodTable";
import Slider from "./components/Slider";
import Jumbo from "./components/Jumbotron";
import MacroTester from "./components/MacroTester";

const App = (props) => {
  const [dailyCalorieSelector, setDailyCalorieSelector] = useState(1800); //Slider Bar Value
  const [foodItemDetails, setFoodItemDetails] = useState([]); //Stored response from API call with searchterm/calories/fat/protein/carbs/iud

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
    const proteinGrams = (dailyCalorieSelector * (protein / 100)) / 4;
    const carbGrams = (dailyCalorieSelector * (carbs / 100)) / 4;
    const fatGrams = (dailyCalorieSelector * (fat / 100)) / 9;

    setRemainingMacros({
      protein: proteinGrams,
      carbs: carbGrams,
      fat: fatGrams,
    });
  };
  //receives the % macros set in MacroSelector component
  //and divides the & against the daily calories selected to give grams required per macro

  const setCalorieHandler = (props) => {
    setDailyCalorieSelector(props.target.value);
  }; //Setting total daily calories. Passed from Slider component

  const onSearchSubmit = async (props) => {
    let data = { title: props, ingr: [props] }; // ingredients list + title required
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
        ]); //Storing searched item and its individual nutritional info in App state alongside previously searched items to dispaly in the FoodTable component rows
        console.log("response", response);
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
        }); //Taking previous grams for each macro and adding it to the newly searched food item
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container className="bg-light">
      <h1 className="nav shadow p-4 mb-4 ">Nutrition API</h1>
      <Jumbo />
      <div className=" shadow p-4 mb-4">
        <div>
          <Slider
            dailyCalorieSelector={dailyCalorieSelector} //Passing down value to display calories selected
            setCalorieHandler={setCalorieHandler} //Setting Calories required from Slider
          />
          <div style={{ alignItems: "center" }}>
            <MacroSelector
              className="padding-bottom"
              macrosHandler={macrosHandler} //Receive the % for each macro to be used to calculate calories for each macro food
              remainingMacros={remainingMacros}
            />
          </div>
          {/* <MacroTester /> */}
        </div>

        <div className="search-input">
          <Searcher
            className="padding-bottom"
            onSearchSubmit={onSearchSubmit}
          />
        </div>
        {foodItemDetails.length > 0 ? (
          <FoodTable
            foodItemDetails={foodItemDetails} //Passing down the cals/grams/name etc to display in a row
            sumOfFoodItems={sumOfFoodItems} //Passing down the total cals etc to display
            removeRow={removeRow}
            dailyCalorieSelector={dailyCalorieSelector} //Passing down total calories selected for diet to calculate remaining calories
            remainingMacros={remainingMacros} // Passing down to dispaly remaing grams for each macro
          />
        ) : (
          ""
        )}
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
