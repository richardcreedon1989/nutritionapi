import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
// import { MdDeleteForever } from "react-icons/md";

const IndividualFood = ({ calories, displaySearchTerm }) => {
  // const removeFoodHandler = () => {};

  return (
    <div>
      <div>
        <ListGroup>
          <ListGroupItem>
            {displaySearchTerm} {calories}
          </ListGroupItem>
          {/* {" "}
          {calories &&
            calories.map((items) => {
              return (
                <ListGroupItem>
                  {items.calories.label} ={" "}
                  {items.calories.nutrients.ENERC_KCAL.toFixed(0)} KCal{" "}
                  <MdDeleteForever onClick={removeFoodHandler} />
                </ListGroupItem>
              );
            })} */}
        </ListGroup>
      </div>
    </div>
  );
};

export default IndividualFood;
