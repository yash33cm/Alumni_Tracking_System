import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { GetUserContext } from "./StateMangement/StateProvider";
import AdminDash from "./pages/AdminDash";
import NavbarComp from "./components/Navbar";
import AlumniPage from "./pages/AlumniPage";
import Posts from "./pages/Posts";
import PostPage from "./pages/PostPage";
import Footer from "./components/footer";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [{ token, role }, dispatch] = GetUserContext();
  return (
    <>
      <Router>
        <NavbarComp />
        <Switch>
          <Route exact path="/">
            {role === "ADMIN" ? (
              <Redirect to="/admin" />
            ) : token ? (
              <Dashboard />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/register">
            {role === "ADMIN" ? (
              <Redirect to="/admin" />
            ) : role === "USER" ? (
              <Redirect to="/" />
            ) : (
              <Register />
            )}
          </Route>
          <Route path="/login">
            {role === "ADMIN" ? (
              <Redirect to="/admin" />
            ) : role === "USER" ? (
              <Redirect to="/" />
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/admin">
            {role === "ADMIN" ? (
              <AdminDash />
            ) : (
              <h1>You cannot access Admin</h1>
            )}
          </Route>
          <Route exact path="/post">
            <Posts />
          </Route>
          <Route exact path="/post/:cllgid">
            <PostPage />
          </Route>
          <Route exact path="/:cllgid">
            <AlumniPage />
          </Route>
          <Route exact path="/profile/:userid">
            <ProfilePage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
