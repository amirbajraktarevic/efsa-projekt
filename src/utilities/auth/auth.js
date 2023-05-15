import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AuthInfo = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        localStorage.setItem("uid", user.uid);
      } else {
        setAuthUser(null);
        localStorage.clear();
      }
    });

    return () => {
      listen();
    };
  }, []);

  const logOut = () => {
    signOut(auth)
      .then(() => navigate("/naslovna"))
      .catch((e) => console.log(e));
  };

  return (
    <>
      {authUser ? (
        <>
          <Nav.Link>
            {`Prijavljen kao ${authUser.email}`}{" "}
            <Button className="ms-3" onClick={logOut}>
              Log out
            </Button>
          </Nav.Link>
        </>
      ) : (
        ""
      )}{" "}
    </>
  );
};

export default AuthInfo;
