import React, { useState, useEffect, useRef } from "react";
import { Input, Form } from "reactstrap";

const Searcher = (props) => {
  const [searchTerm, setsearchTerm] = useState("");

  const onSearchSubmit = (e) => {
    e.preventDefault();
    props.onSearchSubmit(searchTerm);
    console.log("e", searchTerm);
  };

  const searchChangeHandler = (e) => {
    e.preventDefault();
    setsearchTerm(e.target.value);
  };

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log("search data", searchTerm);
    }
  }, [searchTerm]);

  return (
    <div>
      <Form onSubmit={onSearchSubmit}>
        <Input type="text" onChange={searchChangeHandler} />
      </Form>
    </div>
  );
};

export default Searcher;
