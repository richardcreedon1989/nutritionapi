import React from "react";
import { Table } from "reactstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";

//Make the table row a different component https://stackoverflow.com/questions/40044861/get-key-index-on-click-es6-react

const FoodTable = (props) => {
  const { foodItemDetails, sumOfFoodItems } = props;
  const { fat, protein, carbs, calories } = sumOfFoodItems;

  console.log("sumOfFoodItems ", props);

  const removeRow = (e) => {
    props.removeRow(e);
  };

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Food & Quantity</th>
            <th>Fat </th>
            <th>Carbs</th>
            <th>Protein</th>
            <th>Calories</th>
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
