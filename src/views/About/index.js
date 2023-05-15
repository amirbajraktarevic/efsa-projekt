import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ height: "85vh", flexDirection: "block", padding: "200px" }}
    >
      <h1>Projekt iz predmeta Razvoj poslovnih aplikacija</h1>
      <h1>Aplikacija za upis studenata</h1>
      <hr />
      <p className="text-center">
        Web aplikacija u svrhu digitalizacije operativnih procesa jednog
        fakulteta, napravljena je aplikacija preko koje bi se studenti mogli
        upisivati na fakultet. Aplikacija nudi mogućnost popunjavanja forme pri
        unosu osnovnih podataka o studentu, brisanje zapisa, uređivanje, ali i
        mogućnost pregleda svih unosa, kao i njihovo sortiranje i
        kategorizaciju.{" "}
      </p>
      <hr />
      <cite>Sarajevo, 2023.</cite>

      <Button className="w-50 mt-5" onClick={() => navigate("/")}>
        Povratak
      </Button>
    </div>
  );
};

export default About;
