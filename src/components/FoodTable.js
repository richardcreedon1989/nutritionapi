import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";

//Make the table row a different component https://stackoverflow.com/questions/40044861/get-key-index-on-click-es6-react

const FoodTable = (props) => {
  const { foodItemDetails, sumOfFoodItems } = props;
  const { fat, protein, carbs, calories } = sumOfFoodItems;

  const [windowSize, setWindowSize] = useState();
  console.log(window.screen.width, "window");

  const windowClassName = () => {
    if (window.screen.width < 760) {
      return "table-responsive";
    } else {
      return "table";
    }
  }; //table-responsive looks bad on larger than 760px so changing to different className for > than 760

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowSize(window.screen.width);
  //     window.addEventListener("resize", console.log("resized"));
  //   };
  // }, [window]);

  const removeRow = (e) => {
    props.removeRow(e);
    console.log(windowClassName);
  };
  // className={windowClassName()}
  return (
    <div>
      <Table className={windowClassName()} striped>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Food & Quantity</th>
            <th scope="col">Fat </th>
            <th scope="col">Carbs</th>
            <th scope="col">Protein</th>
            <th scope="col">Calories</th>
          </tr>
        </thead>

        <tbody>
          {foodItemDetails.length > 0 &&
            foodItemDetails.map((foodItem, index) => {
              return (
                <tr key={foodItem.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{foodItem.name}</td>
                  <td>{foodItem.fat} g</td>
                  <td>{foodItem.carbs} g</td>
                  <td>{foodItem.protein} g</td>
                  <td>{foodItem.calories} kCal </td>
                  <td>
                    <BsFillPlusCircleFill
                      onClick={() => removeRow(foodItem)}
                    ></BsFillPlusCircleFill>
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tbody>
          <tr style={{ backgroundColor: "grey" }}>
            <th scope="row"></th>
            <td style={{ fontWeight: "bold" }}>Total</td>
            <td>{fat} g</td>
            <td>{carbs} g</td>
            <td>{protein} g</td>
            <td>{calories} kCal </td>
            <td> </td>
          </tr>
        </tbody>
        {props.remainingMacros && (
          <tfoot>
            <tr style={{ backgroundColor: "grey" }}>
              <th scope="row"></th>
              <td style={{ fontWeight: "bold" }}>Remaining</td>
              <td>{props.remainingMacros.fat.toFixed() - fat} g</td>
              <td>{props.remainingMacros.carbs - carbs} g</td>
              <td>{props.remainingMacros.protein - protein} g</td>
              <td>{props.dailyCalorieSelector - calories} kCal </td>
              <td> </td>
            </tr>
          </tfoot>
        )}
      </Table>
    </div>
  );
};
export default FoodTable;
