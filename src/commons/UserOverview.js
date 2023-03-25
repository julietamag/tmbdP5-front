import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { List } from "./List";
import api_key from "../utils/apiKey";
import bgImg from ".././assets/pexels-pavel-danilyuk-7234214.jpg";

export const UserOverview = () => {
  const navigate = useNavigate();
  const [singleSelection, setSingleSelection] = useState({});
  //repeated from profile
  const [movieData, setMovieData] = useState([]);
  const [showData, setShowData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://tmdb-yax5.onrender.com/api/user/profile/${id}`,
        {},
        {
          withCredentials: true, //AxiosRequestConfig parameter
        }
      )
      .then((user) => {
        setSingleSelection(user.data);
      })
      .catch(() => navigate("/404"));
  }, [id, navigate]);

  //repeated from profile
  useEffect(() => {
    if (
      singleSelection.favorites_Movie &&
      singleSelection.favorites_Movie.length > 0
    ) {
      const promises = singleSelection.favorites_Movie.map((favorite) => {
        return axios
          .get(
            `https://api.themoviedb.org/3/movie/${favorite}?api_key=${api_key}&language=en-US`
          )
          .then((result) => result.data)
          .catch(() => null);
      });
      Promise.all(promises).then((results) => {
        setMovieData(results.filter((result) => result !== null));
      });
    }

    if (
      singleSelection.favorites_Show &&
      singleSelection.favorites_Show.length > 0
    ) {
      const promises = singleSelection.favorites_Show.map((favorite) =>
        axios
          .get(
            `https://api.themoviedb.org/3/tv/${favorite}?api_key=${api_key}&language=en-US`
          )
          .then((result) => result.data)
          .catch(() => null)
      );
      Promise.all(promises).then((results) => {
        setShowData(results.filter((result) => result !== null));
      });
    }
  }, [singleSelection.favorites_Movie, singleSelection.favorites_Show]);

  return (
    <div
      className="justify-content-center d-flex min-vh-100 w-100"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "100%",
      }}
    >
      <div className="container w-100 my-5  ">
        <div className="row">
          <div className="col-md-4">
          <img
              src={singleSelection.photo_url}
              className="img-thumbnail"
              alt="profile"
              style={{height: 300,
                width: 300,
                objectFit: 'cover',
              marginTop: '2rem'}}
            />
          </div>
          <div className="col-md-8">
            <h1 className="mb-4">{singleSelection.fullName}</h1>
            <p className="lead">{singleSelection.mail}</p>
            <h2
              style={{
                width: "100%",
                backgroundColor: "black",
                color: "white",
                borderRadius: "1rem",
                padding: ".5rem 1rem",
              }}
            >
              Favorites
            </h2>
            <h4
              style={{
                width: "80%",
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
                borderRadius: "1rem",
                padding: "0 1rem",
              }}
            >
              Movies
            </h4>
            {movieData && movieData.length > 0 ? (
              <List results={movieData} type="movie" />
            ) : (
              <p>You have no favorite movies yet.</p>
            )}
            <h4
              style={{
                width: "80%",
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
                borderRadius: "1rem",
                padding: "0 1rem",
                marginTop: ".5rem",
              }}
            >
              Shows
            </h4>
            {showData && showData.length > 0 ? (
              <List results={showData} type="tv" />
            ) : (
              <p>You have no favorite movies yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
