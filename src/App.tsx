import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile/:nickname" component={Profile} />
    </Router>
  );
};

export default App;
