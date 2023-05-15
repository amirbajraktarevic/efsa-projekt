import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../utilities/img/EFSA.png";
import AuthInfo from "../utilities/auth/auth";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Navbar bg="bright" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>
          <img
            src={logo}
            width="100"
            height="30"
            className="d-inline-block align-top"
            alt="efsa-logo"
          />{" "}
          Razvoj poslovnih aplikacija
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              className="align-self-center"
              style={{ position: "relative", bottom: "2.5px" }}
              onClick={() => navigate("/oprojektu")}
            >
              O projektu
            </Nav.Link>
            <Nav.Link>
              <AuthInfo />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
