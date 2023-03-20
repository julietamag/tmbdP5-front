import React from "react";
import { List } from "../commons/List";
import { useSelector } from "react-redux";

export const SearchResults = () => {
  const results = useSelector((state) => state.search.results);

  return (
    <div className="container">
      {results.length ? (
        <List results={results} />
      ) : (
        <h3>Search something...</h3>
      )}
    </div>
  );
};
