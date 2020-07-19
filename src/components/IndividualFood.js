import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
// import { MdDeleteForever } from "react-icons/md";

const IndividualFood = ({ displayedInfo }) => {
  return (
    <div>
      <div>
        <ListGroup>
          <ListGroupItem>{`${displayedInfo.name} - ${displayedInfo.value}kCal`}</ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default IndividualFood;
