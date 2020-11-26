import React from "react";
import "./Dashboard.scss";
import Calander from "../../components/Dashboard/Calander/Calander";
import Graph from "../../components/Dashboard/Graph/Graph";

export default function Dashboard() {
  return (
    <div className="dashboardPage">
      <div className="header">
        <h2>Your results!</h2>
      </div>
      <h5>Calander feature</h5>
      <Calander />
      <h5>Graph feature</h5>
      <Graph />
    </div>
  );
}
