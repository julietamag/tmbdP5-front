import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { addFavorite } from "../store/user";

import api_key from "../utils/apiKey";

export const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [singleSelection, setSingleSelection] = useState({});
  const user = useSelector((state) => state.user.user);
  const results = useSelector((state) => state.search.results);

  let type;

  const { id } = useParams();
  const {media} = useParams();

  if (results.length) {
    type = results[0].first_air_date ? "tv" : "movie";
  } else {
    type = media
  }



  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${api_key}&language=en-US`
      )
      .then((result) => {
        setSingleSelection(result.data);
      })
      .catch(() => navigate('/404'));
  }, [type, id, dispatch, navigate]);

  //ADD TO FAVORITES
  function handleFavorite() {
    dispatch(addFavorite([singleSelection.id, type]));
    axios
      .post(
        `https://tmbd-p5-front.vercel.app/api/user/${user.id}/favorites/${singleSelection.id}`,
        {
          type: type
        },
        {
          withCredentials: true, //AxiosRequestConfig parameter
        }
      )
      .then((res) => res)
      .catch(() => navigate('/404'));
  }

  return (
    <>
      {type === "movie" ? (
        <div className="container my-5">
          <div className="row">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/original/${singleSelection.poster_path}`}
                alt="Movie Poster"
                className="img-fluid"
              />
            </div>
            <div className="col-md-8">
              <h1 className="mb-4">{singleSelection.title}</h1>
              <p className="lead">{singleSelection.overview}</p>
              <p>
                <strong>Director:</strong> Director Name
              </p>
              <p>
                <strong>Cast:</strong> Cast Names
              </p>
              <p>
                <strong>Release Date:</strong> {singleSelection.release_date}
              </p>
              <p>
                <strong>Genre:</strong>

                {singleSelection.genres &&
                  singleSelection.genres.map((genre, index, array) => {
                    if (index === array.length - 1) {
                      return ` ${genre.name}`;
                    } else {
                      return ` ${genre.name},`;
                    }
                  })}
              </p>

              <p>
                <strong>Rating:</strong> {singleSelection.vote_average}
              </p>
              <p>
                <strong>Duration:</strong> {`${singleSelection.runtime}min`}
              </p>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() =>
                  user ? (
                    handleFavorite()
                  ) : (
                    <p>you need to log in to add favorites</p>
                  )
                }
              >
                <FaStar /> Favorite
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container my-5">
          <div className="row">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/original/${singleSelection.poster_path}`}
                alt="Movie Poster"
                className="img-fluid"
              />
            </div>
            <div className="col-md-8">
              <h1 className="mb-4">{singleSelection.name}</h1>
              <p className="lead">Movie Plot</p>
              <p>
                <strong>Director:</strong> Director Name
              </p>
              <p>
                <strong>Cast:</strong> Cast Names
              </p>
              <p>
                <strong>Release Date:</strong> {singleSelection.first_air_date}
              </p>
              <p>
                <strong>Genre:</strong>
                {singleSelection.genres &&
                  singleSelection.genres.map((genre, index, array) => {
                    if (index === array.length - 1) {
                      return ` ${genre.name}`;
                    } else {
                      return ` ${genre.name},`;
                    }
                  })}
              </p>
              <p>
                <strong>Seasons:</strong> {singleSelection.number_of_seasons}
              </p>
              <p>
                <strong>Rating:</strong> {`${singleSelection.vote_average} %`}
              </p>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() =>
                  user ? (
                    handleFavorite()
                  ) : (
                    <p>you need to log in to add favorites</p>
                  )
                }
              >
                <FaStar /> Favorite
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
