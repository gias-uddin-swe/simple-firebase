import React, { useState } from "react";
import "./Login.css";
import firebaseInitialize from "./../Firebase/Firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  
} from "firebase/auth";

firebaseInitialize();

const Register = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    if (e.target.value.length < 6) {
      console.error("password must need to be at least 6 characters");
      return;
    } else {
      setPassword(e.target.value);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        verifyEmail();
      })
      .catch((error) => console.log(error.message));
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  };



  return (
    <div>
      <div className="login-box d-flex align-items-center justify-content-center">
        <div className="login">
          <div className="login-box">
            <h2 className="text-info">Pease Register</h2>
            <form onSubmit={handleOnSubmit}>
              <input
                onChange={handleEmailChange}
                className="input-felid"
                type="email"
                name="email"
                placeholder="Enter your Email"
              />
              <br />
              <input
                onChange={handlePasswordChange}
                className="input-felid"
                type="password"
                name="password"
                placeholder="Enter your Password"
              />
              <input
                className="mt-3 w-50 btn btn-success m-auto"
                type="submit"
                value="Register"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
