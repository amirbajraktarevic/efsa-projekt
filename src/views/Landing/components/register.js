import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { courseTypes } from "../../../utilities/data/courseTypes";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = ({ setCurrentPage, setShowToast }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState();
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const cycles = ["Prvi", "Drugi", "Treci"];
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCycle, setSelectedCycle] = useState(cycles[0]);
  const [courseType, setCourseType] = useState(courseTypes[0].name);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const id = userCredential.user.uid;
      await setDoc(doc(db, "users", id), {
        firstName,
        lastName,
        idNumber,
        email,
        selectedCycle,
        courseType,
        phoneNumber,
        role: "student",
        id,
      });
      navigate("/pregled");
      setShowToast(true);
    } catch (e) {
      console.log(e);
    }
  };

  const validateNumber = (e) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === "" || re.test(e.target.value)) {
      setIdNumber(e.target.value);
    }
  };

  return (
    <div className="d-flex justify-content-center flex-column mt-5 w-25">
      <div className="text-center">
        <h2>{page === 1 ? "Upisni list" : "Registracija"} </h2>
      </div>
      <div className="mt-3">
        <Form onSubmit={register}>
          {page === 1 && (
            <>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>Ime</Form.Label>
                <Form.Control
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="Unesite vase ime"
                  required
                  minLength={3}
                />
              </Form.Group>
              <Form.Group on className="mb-3" controlId="lastName">
                <Form.Label>Prezime</Form.Label>
                <Form.Control
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Unesite vase prezime"
                  required
                  minLength={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="idNumber">
                <Form.Label>JMBG</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => validateNumber(e)}
                  placeholder="Unesite vas JMBG"
                  value={idNumber}
                  maxLength={13}
                  minLength={13}
                  required
                />
                <Form.Text className="text-muted">
                  Unesite vas jedinstveni maticni broj gradjanina
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>Broj telefona</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unesite vas kontakt telefon"
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  minLength={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>Ciklus</Form.Label>
                <Form.Select
                  onChange={(e) => setSelectedCycle(e.target.value)}
                  value={selectedCycle}
                  required
                >
                  {cycles.map((cycle) => (
                    <option key={cycle}>{cycle}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="courseType">
                <Form.Label>Smjer</Form.Label>
                <Form.Select
                  required
                  onChange={(e) => setCourseType(e.target.value)}
                >
                  {courseTypes
                    .filter((x) => x.cycle === selectedCycle)
                    .map((course) => (
                      <option key={course.name}>{course.name}</option>
                    ))}
                </Form.Select>
              </Form.Group>

              <div className="text-center mt-4">
                <Button
                  variant="primary"
                  onClick={() => setPage(2)}
                  className="w-50"
                >
                  Dalje
                </Button>
              </div>
            </>
          )}
          {page === 2 && (
            <>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Unesite vasu e-mail adresu"
                  onChange={(e) => setEmail(e.target.value)}
                  minLength={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Unesite zeljenu lozinku"
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Lozinka mora imati 8 ili vise karaktera
                </Form.Text>
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  onClick={() => setPage(1)}
                  variant="primary"
                  className="w-50 me-2"
                >
                  Nazad
                </Button>
                <Button type="submit" variant="primary" className="w-50">
                  Podnesi
                </Button>
              </div>
              <div className="mt-2 text-center">
                <span>
                  Vec imas racun?{" "}
                  <span
                    onClick={() => setCurrentPage("login")}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    Prijavi se.
                  </span>
                </span>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Register;
