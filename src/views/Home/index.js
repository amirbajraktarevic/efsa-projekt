import React from "react";
import logo from "../../utilities/img/EFSA_UNSA_Logo.png";
import { Button } from "react-bootstrap";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ height: "100vh", flexDirection: "block" }}
    >
      <div className="">
        <img src={logo} alt="logo-efsa" />
      </div>
      <div className="mt-5 d-flex justify-content-center flex-column text-center">
        <h3>Aplikacija za upis studenata</h3>
        <hr />
        <h5>Evelin Bitic</h5>
        <h5>Majra Hasanic</h5>
        <h5>Nenad Beganovic </h5>
        <h5>Amir Bajraktarevic</h5>
        <h5>Nedzad Bajraktarevic</h5>
        <Button
          className="mt-5"
          variant="primary"
          onClick={() => navigate("/naslovna")}
        >
          Pokreni
        </Button>
      </div>
    </div>
  );
};

export default Home;
