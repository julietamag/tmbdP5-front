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


  let type;

  const { id } = useParams();
  const {media} = useParams();


    type = media


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
        `http://localhost:3001/api/user/${user.id}/favorites/${singleSelection.id}`,
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
        <div
         className="p-5 text-left bg-image object-fit-cover "
         style={{
           backgroundImage:
           `url(https://image.tmdb.org/t/p/original/${singleSelection.backdrop_path})`,
           height: '100vh',
           backgroundRepeat: "no-repeat",
           backgroundSize: "100%",
          }}
       >
          <div className="mask " style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
        <div className="container my-5 ">
          <div className="row">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/original/${singleSelection.poster_path}`}
                alt="Movie Poster"
                className="img-fluid"
              />
            </div>
            <div className="col-md-8">
              <h1 className="mb-4 mt-3 text-light">{type === "movie" ? singleSelection.title : singleSelection.name}</h1>
              <p className="lead text-light">{singleSelection.overview}</p>
              <p className="text-light">
                <strong>Release Date:</strong> {type === "movie" ? singleSelection.release_date : singleSelection.first_air_date}
              </p>
              <p className="text-light">
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

              <p className="text-light">
                <strong>User Score:</strong> {`${Math.round(singleSelection.vote_average * 10)} %`}
              </p>{
                type === "movie" ? (
              <p className="text-light">
                <strong>Duration:</strong> {`${singleSelection.runtime}min`}
              </p>) : 
               <p className="text-light">
               <strong>Seasons:</strong> {singleSelection.number_of_seasons}
             </p>
              }
              <button
                className="btn btn-outline-warning btn-sm"
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
        </div>
        </div>
    </>
  );
};
