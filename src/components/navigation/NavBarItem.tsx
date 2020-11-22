import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

type NavBarItemProps = {
  path: string;
  linkText: string;
};

export default function NavbarItem(props: NavBarItemProps) {
  return (
    <Nav.Item>
      <Nav.Link as={NavLink} to={props.path}>
        {props.linkText}
      </Nav.Link>
    </Nav.Item>
  );
}
