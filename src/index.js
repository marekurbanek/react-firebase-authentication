import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Firebase";

ReactDOM.render(
  <>
    <h1>Deployment test 2</h1>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </>,
  document.getElementById("root")
);
