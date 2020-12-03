import "./LoggedIn.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const history = useHistory();

  const onClickLogOut = () => {
    dispatch(logOut());
    return history.push("/login");
  };

  return (
    <>
      <Nav.Item
        style={{
          padding: ".5rem 1rem",
          color: "grey",
        }}
      >
        {user.email}
      </Nav.Item>
      <Button
        size="sm"
        variant="outline-warning"
        className="button"
        onClick={() => onClickLogOut()}
      >
        Log out
      </Button>
    </>
  );
}
