import React, { useState } from "react";
import "./Login.css";

import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GithubAuthProvider,
} from "firebase/auth";
import firebaseInitialize from "./../Firebase/Firebase.init";

firebaseInitialize();
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const Login = () => {
  const auth = getAuth();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // handle google sign in

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    if (e.target.value.length < 6) {
      console.error("password must need to be at leaset 6 characters");
      return;
    } else {
      setPassword(e.target.value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const { email, name, PhotoURL } = result.user;
        const userInfo = {
          name: name,
          email: email,
          photo: PhotoURL,
        };
        setLoggedInUser(userInfo);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const hanleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const { email, name, PhotoURL } = result.user;
        const userInfo = {
          name: name,
          email: email,
          photo: PhotoURL,
        };
        setLoggedInUser(userInfo);
        setError("");
      })
      .catch((err) => setError(err.message));
  };
  console.log(loggedInUser);
  return (
    <div>
      <h2>{loggedInUser.email}</h2>
      <div className="login-box d-flex align-items-center justify-content-center">
        <div className="login">
          <div className="login-box">
            <h2 className="text-info">Pease Login</h2>
            <p className="text-danger">{error}</p>
            <form onSubmit={handleLogin}>
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
                value="Login"
              />
            </form>
          </div>
          <button className="me-2" onClick={handleGoogleSignIn}>
            Login with Google
          </button>
          <button className="me-2" onClick={handleGithubSignIn}>
            Login with Github
          </button>

          <button className="mt-2" onClick={hanleResetPassword}>
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
