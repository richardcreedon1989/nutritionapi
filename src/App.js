import React, { useState } from "react";
import axios from "axios";
import IndividualFood from "./components/IndividualFood";
import Searcher from "./components/Searcher";

import { Card, CardBody, Row, Col } from "reactstrap";
// Need to render IndividualFood in a parent component inside reactstrap card- can use title to put the search term
//To do above, need to figure out how to pass props with hooks (context potentially)
//

const App = (props) => {
  const [calories, setCalories] = useState([]);
  const [displaySearchTerm, setDisplaySearchTerm] = useState(""); // sending data from searcher to individual calories via App
  const clickHandler = () => {};

  const onSearchSubmit = async (props) => {
    let data = { title: props, ingr: [props] };
    setDisplaySearchTerm(props);

    await axios
      .post(
        `https://api.edamam.com/api/nutrition-details?app_id=8b84adef&app_key=a931603d6a495dba409096cbf9eb7f71`,
        data
      )
      .then((response) => {
        setCalories(response.data.calories); //.calories.nutrients
        console.log(response, "response");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const isInitialMount = useRef(true);
  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     let data = {
  //       title: "Chicken fried rice",
  //       prep:
  //         "1. Have your butcher bone and butterfly the ham and score the fat in a diamond pattern. ...",
  //       yield: "4 servings",
  //       ingr: [
  //         "500 grams chicken breast",
  //         "300 grams rice",
  //         "100 grams sweetcorn",
  //         "2 tablespoons of sugar",
  //         "100 grams brocolli",
  //         "4 tablespoons olive oil",
  //         "4 tablespoons soya sauce",
  //       ],
  //     };
  //     axios
  //       .post(
  //         `https://api.edamam.com/api/nutrition-details?app_id=8b84adef&app_key=a931603d6a495dba409096cbf9eb7f71`,
  //         data
  //       )
  //       .then((response) => {
  //         //.calories.nutrients
  //         console.log(response, "response");
  //         console.log(response.data.calories, "cals");
  //         console.log(
  //           `${response.data.totalNutrients.CHOCDF.quantity.toFixed(0)}${
  //             response.data.totalNutrients.CHOCDF.unit
  //           }`,
  //           "carbs"
  //         );
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [calories]);

  return (
    <div className="Card">
      <div>
        <Searcher onSearchSubmit={onSearchSubmit} />
        <Row>
          <Col sm="6">
            <Card>
              <CardBody>
                <IndividualFood
                  calories={calories}
                  displaySearchTerm={displaySearchTerm}
                  onClick={clickHandler}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default App;
