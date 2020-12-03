import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./spinner.scss";

export default function Loading() {
  return (
    <div>
      <div className="header"></div>
      <div className="loading_spinner">
        <Spinner animation="border" variant="warning">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
}
