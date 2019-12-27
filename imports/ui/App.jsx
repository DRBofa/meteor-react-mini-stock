import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import ParticlesBg from "particles-bg";

import Login from "./components/Login";
import Admin from "./layouts/Admin";
export default () => {
  const [userId, setUserId] = useState("");
  function btnLogin(val) {
    localStorage.setItem("userId", val);
    setUserId(val);
    window.location.href = "/";
  }

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <ParticlesBg type="random" bg={true} />
            <Login btnLogin={btnLogin} />
          </Route>
          <PrivateRoute userId={userId} path="/">
            <Admin btnLogout={btnLogin} />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
};

function PrivateRoute({ userId, children, ...rest }) {
  useEffect(() => {
    console.log("route", userId);
  });
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("userId") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
