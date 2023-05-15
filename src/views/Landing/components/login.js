import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const Login = ({ setCurrentPage, setShowFailToast }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/pregled");
      })
      .catch(() => setShowFailToast(true));
  };
  return (
    <div className="d-flex justify-content-center flex-column mt-5 w-25">
      <Form onSubmit={logIn}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            required
            type="email"
            value={email}
            placeholder="Unesite vasu e-mail adresu"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Lozinka</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Unesite svoju lozinku"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">
            Lozinka mora imati 8 ili vise karaktera
          </Form.Text>
        </Form.Group>
        <div className="text-center mt-4">
          <Button variant="primary" className="w-50" type="submit">
            Prijavi se
          </Button>
        </div>
        <div className="mt-2 text-center">
          <span>
            Nemas racun?{" "}
            <span
              onClick={() => setCurrentPage("register")}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Registruj se.
            </span>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default Login;
