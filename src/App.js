import logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login/Login";
import Register from "./Login/Register";
import { useState } from "react";

function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="App container ">
      <div className="row">
        <div className="login-area col-md-6">
          {toggle ? <Login></Login> : <Register></Register>}

          {toggle ? (
            <p onClick={() => setToggle(false)} className="text-primary ">
              are you new please register
            </p>
          ) : (
            <p onClick={() => setToggle(true)} className="text-primary ">
              already have an account ?
            </p>
          )}
        </div>
        <div className="col-md-6">
          <div className="img">
            <img
              className="image-fluid w-100"
              src="https://i.ibb.co/wB5md78/undraw-Mobile-login-re-9ntv.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
