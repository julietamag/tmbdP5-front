import React, { useEffect, useState } from "react";

import axios from "axios";
import api_key from "../utils/apiKey";

import CarouselMedia from "../commons/Carousel";
import { useNavigate } from "react-router";
import MoviesCarousel from "../commons/Carousel/MoviesCarousel";

export const CarouselView = () => {
  const navigate = useNavigate();
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularShows, setPopularShows] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=2`
      )
      .then((result) => {
        setPopularMovies(result.data.results);
      })
      .catch(() => navigate("/404"));
  }, [navigate]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=2`
      )
      .then((result) => {
        setPopularShows(result.data.results);
      })
      .catch(() => navigate("/404"));
  }, [navigate]);

  return (
    <>
      <h2 className="my-2 text-center text-light">What`s Popular?</h2>
      <h3 className="my-2 text-center text-light">Movies</h3>
      <MoviesCarousel media={popularMovies} type="movie" />
      <h3 className="my-2 text-center text-light">TV Shows</h3>
      <MoviesCarousel media={popularShows} type="tv" />
    </>
  );
};
