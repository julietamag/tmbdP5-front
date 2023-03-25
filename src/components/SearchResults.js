import React from "react";
import { List } from "../commons/List";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const SearchResults = ({type}) => {
  const results = useSelector((state) => state.search.results);

  return (
    <div className="container" style={{minHeight: '100vh'}}>
      {results.length ? (
        <List results={results} type={type} />
      ) : (
        <>
        <h3 className="text-light mt-4">Search something...</h3>
        <Link to={'/'}>Back Home</Link>
        </>
      )}
    </div>
  );
};
