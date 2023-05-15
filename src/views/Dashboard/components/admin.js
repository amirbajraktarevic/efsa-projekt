import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { Accordion, Button, Form, Spinner, Table } from "react-bootstrap";
import { courseTypes } from "../../../utilities/data/courseTypes";

const Admin = () => {
  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("Svi");
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getDocs(collection(db, "users"))
      .then((querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((doc) => {
          temp.push(doc.data());
        });
        setUsersData(temp);
        setLoaded(true);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  useEffect(() => {
    if (usersData && usersData.length > 0) {
      if (filter === "Svi") {
        setFilteredUsers(usersData.filter((user) => user.role === "student"));
      } else {
        setFilteredUsers(
          usersData.filter(
            (user) => user.role === "student" && user.courseType === filter
          )
        );
      }
    }
  }, [usersData, filter]);

  const deleteEntry = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
  };

  return (
    <>
      <Form.Group className="d-flex w-50 flex-column p-5">
        <Form.Label className="text-start">Filter smjera</Form.Label>
        <Form.Select
          className="w-50 mb-5"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Svi">Svi</option>
          {courseTypes.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className="d-flex justify-content-center">
        <div className="w-75">
          {filteredUsers?.map((user) => (
            <Accordion key={user.idNumber}>
              <Accordion.Item eventKey="0" key={user.idNumber}>
                <Accordion.Header>
                  {user.firstName} {user.lastName}
                </Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>
                        <th>JMBG</th>
                        <th>Broj telefona</th>
                        <th>Ciklus</th>
                        <th>Smjer</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.idNumber}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.selectedCycle}</td>
                        <td>{user.courseType}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button
                    className="me-3"
                    variant="danger"
                    onClick={() => deleteEntry(user.id)}
                  >
                    Obrisi studenta
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;
