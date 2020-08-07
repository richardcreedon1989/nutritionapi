import React from "react";
import { Table } from "reactstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";

//Make the table row a different component https://stackoverflow.com/questions/40044861/get-key-index-on-click-es6-react
const FoodTable = (props) => {
  const {
    displayedInfo,
    fatTotal,
    proteinTotal,
    carbsTotal,
    calorieTotal,
  } = props;

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
          {displayedInfo.length > 0 &&
            displayedInfo.map((displayedInfo, index) => {
              return (
                <tr key={displayedInfo.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{displayedInfo.name}</td>
                  <td>{displayedInfo.fat} g</td>
                  <td>{displayedInfo.carbs} g</td>
                  <td>{displayedInfo.protein} g</td>
                  <td>{displayedInfo.calories} kCal </td>
                  <td>
                    <BsFillPlusCircleFill
                      onClick={() => removeRow(displayedInfo)}
                    ></BsFillPlusCircleFill>{" "}
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr style={{ backgroundColor: "grey" }}>
            <th scope="row"></th>
            <td style={{ fontWeight: "bold" }}>Total</td>
            <td>{fatTotal} g</td>
            <td>{carbsTotal} g</td>
            <td>{proteinTotal} g</td>
            <td>{calorieTotal} kCal </td>
            <td> </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};
export default FoodTable;
