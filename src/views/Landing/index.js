import React, { useState } from "react";
import Register from "./components/register";
import logo from "../../utilities/img/EFSA_UNSA_Logo.png";
import Login from "./components/login";
import { Toast, ToastContainer } from "react-bootstrap";

const Landing = () => {
  const [currentPage, setCurrentPage] = useState("register");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailToast, setShowFailToast] = useState(false);
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ height: "100vh" }}
    >
      {showSuccessToast && (
        <ToastContainer position="top-start">
          <Toast
            onClose={() => setShowSuccessToast(false)}
            show={showSuccessToast}
            animation
            bg="success"
          >
            <Toast.Header>
              <strong className="me-auto">EFSA</strong>
              <small>upravo</small>
            </Toast.Header>
            <Toast.Body>Cestitamo, uspjesno ste se upisali!</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      {showFailToast && (
        <ToastContainer position="top-start">
          <Toast
            onClose={() => setShowFailToast(false)}
            show={showFailToast}
            animation
            bg="warning"
          >
            <Toast.Header>
              <strong className="me-auto">EFSA</strong>
              <small>upravo</small>
            </Toast.Header>
            <Toast.Body>
              Nazalost, prijava nije uspjela, provjerite e-mail i lozinku.
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <div>
        <img src={logo} alt="efsa-logo" />
      </div>
      {currentPage === "register" ? (
        <Register
          setCurrentPage={setCurrentPage}
          setShowSuccessToast={setShowSuccessToast}
        />
      ) : (
        <Login
          setCurrentPage={setCurrentPage}
          setShowFailToast={setShowFailToast}
        />
      )}
    </div>
  );
};

export default Landing;
