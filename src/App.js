import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import IndividualFood from "./components/IndividualFood";
import Searcher from "./components/Searcher";
import Basket from "./components/Basket";
import CalorieDisplay from "./components/CalorieDisplay";
import FoodTable from "./components/FoodTable";
import Sliders from "./components/Slider";
import NutrientRatio from "./components/NutrientRatio";
import MultiSliderNutrient from "./components/MultiSliderNutrient";

import {
  Card,
  Label,
  CardBody,
  Input,
  Form,
  Row,
  Col,
  CardTitle,
  Button,
  CardText,
} from "reactstrap";

const App = (props) => {
  const [displayedInfo, setDisplayedInfo] = useState([]); //combining the term searched and the API return data for display
  const [setErrorResponse] = useState(false);
  const [calorieTotal, setCalorieTotal] = useState(0);
  const [calorieSelected, setCalorieSelected] = useState(1800);
  const [protein, setProtein] = useState(40);
  const [carbs, setCarbs] = useState(40);
  const [fat, setFat] = useState(20);

  const [fatTotal, setFatTotal] = useState(0);
  const [carbsTotal, setCarbsTotal] = useState(0);
  const [proteinTotal, setProteinTotal] = useState(0);

  const [nutrientPercentage, setNutrientPercentage] = useState({
    protein: 40,
    carbs: 40,
    fat: 20,
  });

  // const calorieCalculator = (props) => {
  //   setCalorieTotal(calorieTotal - props.value);
  //   console.log("cals total", calorieTotal);
  // };

  const removeRow = (props) => {
    let deletedRowNewArray = displayedInfo.filter((row) => {
      return row.id !== props.id;
    });

    setCalorieTotal(calorieTotal - props.calories);
    setFatTotal(fatTotal - props.fat);
    setCarbsTotal(carbsTotal - props.carbs);
    setProteinTotal(proteinTotal - props.protein);
    setDisplayedInfo(deletedRowNewArray);
  };

  const setCalorieHandler = (e) => {
    setCalorieSelected(e.target.value);
  };

  const ratioHandler = () => {};

  const onSearchSubmit = async (props) => {
    let data = { title: props, ingr: [props] }; //ingr = ingredients list + title required
    await axios
      .post(
        `https://api.edamam.com/api/nutrition-details?app_id=8b84adef&app_key=a931603d6a495dba409096cbf9eb7f71`,
        data
      )
      .then((response) => {
        console.log("response", response);
        console.log("respone extra", response.data.calories);
        setDisplayedInfo([
          ...displayedInfo,
          {
            name: props,
            calories: response.data.calories,
            fat: response.data.totalNutrients.FAT.quantity.toFixed(),
            carbs: response.data.totalNutrients.CHOCDF.quantity.toFixed(),
            protein: response.data.totalNutrients.PROCNT.quantity.toFixed(),
            id: uuidv4(),
          },
        ]);
        setCalorieTotal(calorieTotal + parseInt(response.data.calories));
        setFatTotal(
          fatTotal +
            parseInt(response.data.totalNutrients.FAT.quantity.toFixed())
        );
        setCarbsTotal(
          carbsTotal +
            parseInt(response.data.totalNutrients.CHOCDF.quantity.toFixed())
        );
        setProteinTotal(
          proteinTotal +
            parseInt(response.data.totalNutrients.PROCNT.quantity.toFixed())
        );
        console.log("displayed", displayedInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="Card">
      <div>
        <div style={{ width: "50%" }}>
          {`Protein: ${protein}, Carbs: ${carbs}, Fat: ${fat}`}
          {/* <Sliders orientation="vertical" nutrientPercentage={protein} />
          <Sliders orientation="vertical" carbs={carbs} />
          <Sliders orientation="vertical" fat={fat} /> */}
          {/* <NutrientRatio />
          <MultiSliderNutrient /> */}
        </div>
        <div style={{ width: "50%" }}>
          <Form>
            <Label for="volume">
              {`Select Daily Calorie Intake: ${calorieSelected}`}
            </Label>

            <Input
              type="range"
              id="volume"
              name="volume"
              min="800"
              max="6000"
              step="10"
              value={calorieSelected}
              onChange={setCalorieHandler}
            />
          </Form>
        </div>

        <CalorieDisplay calorieTotal={calorieTotal} />
        <Searcher
          onSearchSubmit={onSearchSubmit}
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <FoodTable
          displayedInfo={displayedInfo}
          fatTotal={fatTotal}
          proteinTotal={proteinTotal}
          carbsTotal={carbsTotal}
          calorieTotal={calorieTotal}
          removeRow={removeRow}
        />

        {/* {displayedInfo.length > 0 && (
          <Row>
            <Col sm="6">
              <Card body>
                {" "}
                {displayedInfo.map((displayedInfo) => {
                  return (
                    <IndividualFood
                      calorieCalculator={calorieCalculator}
                      displayedInfo={displayedInfo}
                    />
                  );
                })}
              </Card>
            </Col>
          </Row>
        )} */}
      </div>
    </div>
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
