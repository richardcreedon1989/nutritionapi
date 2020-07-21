import React, { useState } from "react";
import axios from "axios";
import IndividualFood from "./components/IndividualFood";
import Searcher from "./components/Searcher";

import { Card, CardBody, Row, Col } from "reactstrap";

const App = (props) => {
  const [displayedInfo, setDisplayedInfo] = useState([]); //combining the term searched and the API return data for display
  const [setErrorResponse] = useState(false);

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
      })
      .catch((err) => {
        console.log(err);
        setErrorResponse(true); //throwing a not function error when get 555 response
      });
  };
  return (
    <div className="Card">
      <div>
        <Searcher onSearchSubmit={onSearchSubmit} />
        <Row>
          <Col sm="6">
            <Card>
              <CardBody>
                {displayedInfo.map((displayedInfo) => {
                  console.log("displayedInfo", displayedInfo);
                  return <IndividualFood displayedInfo={displayedInfo} />;
                })}
              </CardBody>
            </Card>
          </Col>
        </Row>
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
