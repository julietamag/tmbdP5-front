import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useInput } from "../hooks/useInput";
import api_key from "../utils/apiKey";
import { Form, Button } from "react-bootstrap";
import { setResults} from "../store/search";
import { useDispatch } from "react-redux";
import { CarouselView } from "./CarouselView";
import bgImage from '../assets/pexels-david-bartus-714926.jpg'


export const Home = () => {
  const navigate = useNavigate();
  const search = useInput();
  const [type, setType] = useState("movie");
  const dispatch = useDispatch()

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  // search results
  function handleSubmit(e) {
    e.preventDefault();
    if (type === "movie" || type === "tv") {
      axios
        .get(
          `https://api.themoviedb.org/3/search/${type}?api_key=${api_key}&language=en-US&page=2&include_adult=false&sort_by=popularity.desc&query=${search.value}`
        )
        .then((result) => {
          dispatch(setResults(result.data.results));
          navigate(`/search/${type}`);
        })
        .catch(() => {
          navigate('/404');
        });
    }
    if (type === "user") {
      axios
        .get(`https://tmdb-yax5.onrender.com/api/user/search?query=${search.value}`)
        .then((result) => {
         dispatch(setResults(result.data));
         navigate("/search/users");
        })
        .catch(() => {
          navigate('/404')
        });
    }
  }

  return (
    <>
      <div
        className="p-5 text-center bg-image object-fit-cover "
        style={{
          backgroundImage:
            `url(${bgImage})`,
          minHeight: 400,
         
          backgroundSize: "100%",
        }}
      >
        <div className="mask " style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex my-3 justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="my-3 ">Welcome.</h1>
              <h4 className="mb-3">
                Millions of movies, TV shows and people to discover. Explore
                now.
              </h4>
              <Form onSubmit={handleSubmit} >
                <Form.Group className="d-inline-flex justify-content-around w-50 p-2">
                  <Form.Check
                    type="radio"
                    id="movie"
                    label="Movies"
                    value="movie"
                    checked={type === "movie"}
                    onChange={handleTypeChange}
                  />
                  <Form.Check
                    type="radio"
                    id="tv"
                    label="TV"
                    value="tv"
                    checked={type === "tv"}
                    onChange={handleTypeChange}
                  />
                  <Form.Check
                    type="radio"
                    id="user"
                    label="User"
                    value="user"
                    checked={type === "user"}
                    onChange={handleTypeChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={search.value}
                    onChange={search.onChange}
                  />
                </Form.Group>
                <button className="button-17 my-3" type="submit">Search</button>
              </Form>
            </div>
          </div>
        </div>
      </div>

  
        <CarouselView />

  
    </>
  );
};
