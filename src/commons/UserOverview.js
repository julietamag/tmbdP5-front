import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { List } from "./List";
import api_key from "../utils/apiKey";

export const UserOverview = ({ type }) => {
  const navigate = useNavigate()
  const [singleSelection, setSingleSelection] = useState({});
  //repeated from profile
  const [movieData, setMovieData] = useState([]);
  const [showData, setShowData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://tmbd-p5-front-3widubzvv-julietamag.vercel.app/api/user/profile/${id}`,
        {},
        {
          withCredentials: true, //AxiosRequestConfig parameter
        }
      )
      .then((user) => {
        setSingleSelection(user.data);
      })
      .catch(() => navigate('/404'));
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
    <div className="container w-100 my-5  ">
      <div className="row">
        <div className="col-md-4">
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
        <div className="col-md-8">
          <h1 className="mb-4">{singleSelection.fullName}</h1>
          <p className="lead">{singleSelection.mail}</p>
          <p>
            <strong>Favorite Movies:</strong>

            <h4>Movies</h4>
            {movieData && movieData.length > 0 ? (
              <List results={movieData} />
            ) : (
              <p>You have no favorite movies yet.</p>
            )}
            <h4>Shows</h4>
            {showData && showData.length > 0 ? (
              <List results={showData} />
            ) : (
              <p>You have no favorite movies yet.</p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
