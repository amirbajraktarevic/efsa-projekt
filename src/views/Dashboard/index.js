import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import "./style.css";
import Student from "./components/student";
import { Spinner } from "react-bootstrap";
import Admin from "./components/admin";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const currentUserUid = localStorage.getItem("uid");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentUserUid), (doc) => {
      setUserData(doc.data());
    });

    return () => {
      unsub();
    };
  }, []);

  return userData ? (
    <div className="mt-5 flex-column  text-center" style={{ height: "100vh" }}>
      {userData?.role === "student" ? (
        <Student userData={userData} />
      ) : (
        <Admin />
      )}
    </div>
  ) : (
    <div
      className="d-flex justify-content-center align-items-center mt-5 text-center"
      style={{ height: "80vh" }}
    >
      <Spinner size="XL" />
    </div>
  );
};

export default Dashboard;
