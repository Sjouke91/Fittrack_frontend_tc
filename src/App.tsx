import React, { useEffect } from "react";
import "./App.scss";

import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./components/navigation";
import Loading from "./components/loading";
import MessageBox from "./components/messageBox";
import SignUp from "./pages/signUp/SignUp";
import Login from "./pages/login/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { selectToken } from "./store/user/selectors";
import Dashboard from "./pages/dashboard/Dashboard";
import WorkoutList from "./pages/workoutList/WorkoutList";
import Workout from "./pages/workout/Workout";
import Creator from "./pages/creator/Creator";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const userWithToken = useSelector(selectToken);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/">
          {!userWithToken ? <Redirect to="/login" /> : <Dashboard />}
        </Route>
        <Route exact path="/workouts" component={WorkoutList} />
        <Route path="/workouts/:id" component={Workout} />
        <Route path="/creator" component={Creator} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
