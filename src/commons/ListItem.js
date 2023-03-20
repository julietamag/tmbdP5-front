import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/user";
import axios from "axios";
import { message } from "antd";

export const ListItem = ({ result }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  let location = useLocation();
  let type;

  type = result.first_air_date ? "tv" : "movie";

  //ADD TO FAVORITES
  function handleFavorite() {
    dispatch(addFavorite([result.id, type]));
    axios
      .post(
        `https://localhost:3001/api/user/${user.id}/favorites/${result.id}`,
        {
          type: type,
        },
        {
          withCredentials: true, //AxiosRequestConfig parameter
        }
      )
      .then((res) => res)
      .catch(() => navigate('/404'));
  }

  //REMOVE FROM FAVORITES
  function handleRemoveFavorite() {
    axios
      .delete(
        `https://localhost:3001/api/user/${user.id}/favorites/${result.id}`,
        {
          favorites_Show: result.id,
          favorites_Movie: result.id,
        },
        {
          withCredentials: true, //AxiosRequestConfig parameter
        }
      )
      .then(() => {
        dispatch(removeFavorite(result.id));
      })
      .catch(() => navigate('/404'));
  }

  return (
    <ListGroup.Item>
      {result.email ? (
        <Card>
          <div className="d-flex align-items-center">
            <Card.Img
              variant="left"
              src={result.photo_url}
              style={{ maxWidth: "100px" }}
            />
            <div className="ml-3">
              <Card.Title>{result.fullName}</Card.Title>

              <Card.Text>{result.email}</Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate(`/overview/users/${result.id}`)}
              >
                View More
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="d-flex align-items-center">
            <Card.Img
              variant="left"
              src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
              style={{ maxWidth: "100px" }}
            />
            <div className="ml-3">
              <Card.Title>{result.title}</Card.Title>

              <Card.Text>
                {result.overview
                  ? result.overview || result.known_for.overview
                  : "no descprition given"}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate(`/overview/media/${result.id}`)}
              >
                View More
              </Button>
              {location.pathname.slice(0, -2) === "/user/profile" ? (
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemoveFavorite()}
                >
                  Remove
                </button>
              ) : (
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() =>
                    user
                      ? handleFavorite()
                      : message.error(
                          `You need to be registered to add favorites`
                        )
                  }
                >
                  <FaStar /> Favorite
                </button>
              )}
            </div>
          </div>
        </Card>
      )}
    </ListGroup.Item>
  );
};
