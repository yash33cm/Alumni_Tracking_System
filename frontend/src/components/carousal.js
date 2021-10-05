/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import { Carousel } from "react-bootstrap";
import { GetUserContext } from "../StateMangement/StateProvider";

export default function Carousal() {
  const [{ username }, dispatch] = GetUserContext();
  return (
    <div
      style={{
        display: "block",
        width: "100%",
        marginTop: "10px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        {`Welcome to Alumni Union, ${username} !`}
      </h1>
      <img
        className="d-block w-100"
        object-fit="contain"
        src="/alumni.jpg"
        alt=""
        style={{
          border: "",
          borderRadius: "2px",
        }}
      />
      <br />
      <br />
      {/* <Carousel style={{ marginTop: "10px", border: "2px solid black" }}>
        <Carousel.Item>
          <img
            objectFit="cover"
            className="d-block w-100"
            src="./grad.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h2 className="hide-small">Graduation to Workspace</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            objectFit="cover"
            className="d-block w-100"
            src="./work.png"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h2 className="hide-small">Transforming the future</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            objectFit="cover"
            className="d-block w-100"
            src="./hire.png"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h2 className="hide-small">Leaders</h2>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
    </div>
  );
}
