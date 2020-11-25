import "./index.scss";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavBarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import logo from "../../logo/logo.png";

export default function Navigation() {
  const user = useSelector(selectUser);

  const loginLogoutControls = user.token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar
      id="navBar"
      className="navbar sticky-top navbar-light bg-light"
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <img className="logo" src={logo} alt="logo" />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          {user ? (
            <div className="userLinks">
              <div className="link">
                <NavbarItem path="/" linkText="Dashboard" />
              </div>
              <div className="link">
                <NavbarItem path="/workouts" linkText="Workouts" />
              </div>
              <div className="link">
                <NavbarItem path="/creator" linkText="Creator" />{" "}
              </div>
            </div>
          ) : null}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
