import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/user";
import axios from "axios";
import { message } from "antd";

export const ListItem = ({ result, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  let location = useLocation();
  // let type;

  // type = result.first_air_date ? "tv" : "movie";
  console.log(type);
  //ADD TO FAVORITES
  function handleFavorite() {
    dispatch(addFavorite(result));
    axios
      .post(
        `http://localhost:3001/api/user/${user.id}/favorites/${result.id}`,
        {
          type: type,
        },
        {
          withCredentials: true, //AxiosRequestConfig parameter
        }
      )
      .then(() => message.success("Item added to Favorites"))
      .catch(() => navigate("/404"));
  }

  //REMOVE FROM FAVORITES
  function handleRemoveFavorite() {
    axios
      .delete(
        `http://localhost:3001/api/user/${user.id}/favorites/${result.id}`,
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
        message.success("Item removed from Favorites");
      })
      .catch(() => navigate("/404"));
  }

  return (
    <ListGroup.Item style={{backgroundColor:'black'}}>
      {result.email ? (
        <Card >
          <div className="d-flex align-items-center p-2">
            <Card.Img
              variant="left"
              src={result.photo_url}
              style={{ maxWidth: "100px" }}
            />
            <div >
              <Card.Title style={{marginLeft: '2rem'}}>{result.fullName}</Card.Title>
              <Card.Text style={{marginLeft: '2rem'}}>{result.email}</Card.Text>
              <Button
                variant="dark"
                style={{marginLeft: '2rem'}}
                onClick={() => navigate(`/overview/users/${result.id}`)}
              >
               <i class="fa fa-plus" aria-hidden="true"></i>
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
            <div className="m-4">
              <Card.Title>{result.title || result.name}</Card.Title>
              <Card.Text>
                {result.overview
                  ? result.overview || result.known_for.overview
                  : "no descprition given"}
              </Card.Text>
              <Button
                variant="dark"
                className="mx-2"
                onClick={() => navigate(`/overview/${type}/${result.id}`)}
              >
                <i class="fa fa-plus" aria-hidden="true"></i>
              </Button>{" "}
              {location.pathname.slice(0, -2) === "/user/profile" ? (
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => handleRemoveFavorite()}
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </Button>
              ) : (
                <Button
                  variant="warning"
                  className="ml-2"
                  onClick={() =>
                    user
                      ? handleFavorite()
                      : message.error(
                          `You need to be registered to add favorites`
                        )
                  }
                >
                  <FaStar /> Favorite
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}
    </ListGroup.Item>
  );
};
