import React, { useState } from "react";
import { Input, Form } from "reactstrap";

const Searcher = (props) => {
  const [searchTerm, setsearchTerm] = useState();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    props.onSearchSubmit(searchTerm);
  };

  const searchChangeHandler = (e) => {
    e.preventDefault();
    setsearchTerm(e.target.value);
  };

  return (
    <div>
      <Form onSubmit={onSearchSubmit}>
        <Input type="text" onChange={searchChangeHandler} />
      </Form>
    </div>
  );
};

export default Searcher;
