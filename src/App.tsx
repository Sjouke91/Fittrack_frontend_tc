import React, { useEffect } from "react";
import "./App.scss";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import Loading from "./components/loading";
import MessageBox from "./components/messageBox";
import SignUp from "./pages/signUp/SignUp";
import Login from "./pages/login/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import Dashboard from "./pages/dashboard/Dashboard";
import WorkoutList from "./pages/workoutList/WorkoutList";
import Workout from "./pages/workout/Workout";
import Creator from "./pages/creator/Creator";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/workouts" component={WorkoutList} />
        <Route path="/workouts/:workoutId" component={Workout} />
        <Route path="/creator" component={Creator} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
