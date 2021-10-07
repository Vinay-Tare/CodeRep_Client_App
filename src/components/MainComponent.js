import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import React from "react";

function Main() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/home" component={Home} />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default Main;