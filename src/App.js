import React, { useState } from "react";
import axios from "axios";
import IndividualFood from "./components/IndividualFood";
import Searcher from "./components/Searcher";
import Basket from "./components/Basket";

import {
  Card,
  CardBody,
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

  const calorieCalculator = (props) => {
    setCalorieTotal(calorieTotal + props);
    console.log(calorieTotal);
  };

  const onSearchSubmit = async (props) => {
    let data = { title: props, ingr: [props] }; //ingr = ingredients list + title required
    await axios
      .post(
        `https://api.edamam.com/api/nutrition-details?app_id=8b84adef&app_key=a931603d6a495dba409096cbf9eb7f71`,
        data
      )
      .then((response) => {
        setDisplayedInfo([
          ...displayedInfo,
          {
            name: props,
            value: response.data.calories,
          },
        ]);
        console.log("displayed", displayedInfo);
      })
      .catch((err) => {
        console.log(err);
        // setErrorResponse(true); //throwing a not function error when get 555 response
      });
  };
  return (
    <div className="Card">
      <div>
        <Searcher
          onSearchSubmit={onSearchSubmit}
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <Row>
          {displayedInfo.length > 0 &&
            displayedInfo.map((displayedInfo) => {
              return (
                <div
                  // style={{
                  //   display: "grid",
                  //   width: "30%",
                  //   margin: "auto",
                  // }}
                  style={{
                    display: "grid",
                    // gridTemplateColumns: "auto auto auto",
                    margin: "1.2em",
                    width: "33%",
                  }}
                >
                  <Col>
                    <IndividualFood
                      style={{ gridColumnStart: "1", gridColumnEnd: "3" }}
                      calorieCalculator={calorieCalculator}
                      displayedInfo={displayedInfo}
                    />
                  </Col>
                </div>
              );
            })}
        </Row>

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
