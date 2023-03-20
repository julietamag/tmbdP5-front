import { Carousel } from "react-bootstrap";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

const CarouselMedia = ({ media, type }) => {
  const navigate = useNavigate()
    function handleClick(e){
      navigate(`/overview/${type}/${e.target.id}`)
   
    }
  return (
    <Container style={{ height: "25%" }}>
        <Row>
          <Col>
            <h3 className="text-uppercase text-center">{type}</h3>
          </Col>
        </Row>
        <Row>
      <Carousel pause="hover">
        {media.map((movie) => (
          <Carousel.Item key={movie.id} className="h-50" onClick={handleClick} >
            <img
              className="d-block w-100"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              id={movie.id} 
            />
            <Carousel.Caption>
              <h3>{movie.title || movie.name}</h3>
             
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
        </Row>
    </Container>
  );
};

export default CarouselMedia;
