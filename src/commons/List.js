import React from "react";
import { ListGroup } from "react-bootstrap";
import { ListItem } from "./ListItem";

export const List = ({ results }) => {
  return (
    <ListGroup>
      {results.length &&
        results.map((result) => <ListItem key={`${result.id}abc`} result={result} />)}
    </ListGroup>
  );
};
