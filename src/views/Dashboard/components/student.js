import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { courseTypes } from "../../../utilities/data/courseTypes";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const Student = ({ userData }) => {
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [idNumber, setIdNumber] = useState(userData.idNumber);
  const [email, setEmail] = useState(userData.email);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [selectedCycle, setSelectedCycle] = useState(userData.selectedCycle);
  const [courseType, setCourseType] = useState(userData.courseType);
  const [mode, setMode] = useState("read");
  const cycles = ["Prvi", "Drugi", "Treci"];

  const updateFields = async () => {
    const docRef = doc(db, "users", localStorage.getItem("uid"));
    await updateDoc(docRef, {
      firstName,
      lastName,
      idNumber,
      email,
      selectedCycle,
      courseType,
      phoneNumber,
      role: userData.role,
    });
  };

  useEffect(() => {
    console.log(courseType);
  }, [courseType]);

  const validateNumber = (e) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === "" || re.test(e.target.value)) {
      setIdNumber(e.target.value);
    }
  };

  return mode === "read" ? (
    <>
      <Button
        className="mb-5"
        onClick={() => setMode("edit")}
        variant="primary"
      >
        Uredi
      </Button>
      <div>
        <h1>Podaci o studentu:</h1>
      </div>
      <hr />
      <div>
        <h3>Ime</h3>
        <span className="student-info">{userData?.firstName}</span>
      </div>
      <hr />
      <div>
        <h3>Prezime</h3>
        <span className="student-info">{userData?.lastName}</span>
      </div>
      <hr />
      <div>
        <h3>E-mail</h3>
        <span className="student-info">{userData?.email}</span>
      </div>
      <hr />
      <div>
        <h3>Broj telefona</h3>
        <span className="student-info">{userData?.phoneNumber}</span>
      </div>
      <hr />
      <div>
        <h3>JMBG</h3>
        <span className="student-info">{userData?.idNumber}</span>
      </div>
      <hr />

      <div>
        <h3>Ciklus</h3>
        <span className="student-info">{userData?.selectedCycle}</span>
      </div>
      <hr />

      <div>
        <h3>Smjer</h3>
        <span className="student-info">{userData?.courseType}</span>
      </div>
    </>
  ) : (
    <div className="d-flex justify-content-center">
      <div className="d-flex justify-content-center flex-column mt-5 w-25">
        <Form onSubmit={updateFields}>
          <Button
            className="mb-5"
            onClick={() => setMode("read")}
            variant="danger"
          >
            Odustani
          </Button>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>Ime</Form.Label>
            <Form.Control
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              value={firstName}
            />
          </Form.Group>
          <Form.Group on className="mb-3" controlId="lastName">
            <Form.Label>Prezime</Form.Label>
            <Form.Control
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              value={lastName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="idNumber">
            <Form.Label>JMBG</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => validateNumber(e)}
              value={idNumber}
              maxLength={13}
              minLength={13}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Broj telefona</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesite vas kontakt telefon"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
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
              value={courseType}
            >
              {courseTypes
                .filter((x) => x.cycle === selectedCycle)
                .map((course) => (
                  <option key={course.name}>{course.name}</option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Unesite vasu e-mail adresu"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Button variant="primary" className="mt-3" type="submit">
            Spasi
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Student;
