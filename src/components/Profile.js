import React, { useEffect, useState } from "react";
import { ImImages } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import api_key from "../utils/apiKey";
import { setUserDetails } from "../store/user";
import { List } from "../commons/List";

export const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [showData, setShowData] = useState([]);

  //GET PROFILE
  useEffect(() => {
    axios
      .get(
        `https://tmbd-p5-front.vercel.app/api/user/profile/${id}`,
        {},

        {
          withCredentials: true, //AxiosRequestConfig parameter
        }
      )
      .then((user) => {
        dispatch(setUserDetails(user.data));
      })

      .catch((err) => {
        console.error(err);
        navigate("/404");
      });
  }, [id, dispatch, navigate]);

  //FETCH FAVORITE MOVIES AND SHOWS
  useEffect(() => {
    //MOVIES
    if (user.favorites_Movie && user.favorites_Movie.length > 0) {
      const promises = user.favorites_Movie.map((favorite) => {
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
    //SHOWS
    if (user.favorites_Show && user.favorites_Show.length > 0) {
      const promises = user.favorites_Show.map((favorite) =>
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
  }, [user.favorites_Movie, user.favorites_Show]);

  function handleImageChange() {
    const newPhotoUrl = prompt("Enter the URL for the new profile picture:");
    if (newPhotoUrl) {
      axios
        .put(
          `https://tmbd-p5-front.vercel.app/api/user/imageChange/${id}`,
          { photo_url: newPhotoUrl },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(setUserDetails(res.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div className="justify-content-center d-flex  w-100 min-vh-100">
      <div className="card mb-3 w-75">
        <div className="row g-0 ">
          <div className="col-md-4">
            <img
              src={user.photo_url}
              className="img-fluid rounded-start"
              alt="profile"
              height={400}
            />
            <button
              className="btn btn-outline-dark btn-l mt-3 ml-2"
              onClick={handleImageChange}
            >
              Change Profile Picture <ImImages />
            </button>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">
                {user.name} {user.lastName}
              </h2>
              <p className="card-text">
                <strong>Email: </strong>
                {user.email}
              </p>
              <div>
                <h2>Favorites</h2>
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
                  <p>You have no favorite shows yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
