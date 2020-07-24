import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";

const IndividualFood = (props) => {
  const { displayedInfo } = props;
  const calorieCalculator = (e) => {
    props.calorieCalculator(displayedInfo.value);
    console.log("value", displayedInfo.value);
  };

  return (
    <div>
      <div>
        <ListGroup>
          <ListGroupItem>
            {`${displayedInfo.name} - ${displayedInfo.value}kCal`}
            <BsFillPlusCircleFill
              onClick={calorieCalculator}
              style={{ float: "right" }}
            >
              {" "}
              Click{" "}
            </BsFillPlusCircleFill>{" "}
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default IndividualFood;
