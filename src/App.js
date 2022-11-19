import React from "react";
import Login from "./components/user/Login";
import Matches from "./components/match/Matches";
import Home from "./components/Home";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import PublicRoutes from "./components/PublicRoutes";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoutes from "./components/PrivateRoutes";
import CreateTournament from "./components/tournament/CreateTournament";
import Tournaments from "./components/tournament/Tournaments";
import UserTournament from "./components/tournament/UserTournament";
import Notifications from "./components/user/Notifications"

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoutes/>}>
            <Route element={<Login/>} path="/"/>
            <Route element={<Register/>} path="/register"/>
            <Route element={<Login/>} path="/login"/>
          </Route>
          <Route element={<PrivateRoutes/>}>
            <Route element={<Home/>} path="/home"/>
            <Route element={<Profile/>} path="/profile"/>
            <Route element={<CreateTournament/>} path="/tournament/create"/>
            <Route element={<Tournaments/>} path="/tournaments"/>
            <Route element={<UserTournament/>} path="/userTournament/:tournamentId"/>
            <Route element={<Matches/>} path="/matches/:compId"/>
            <Route element={<Notifications/>} path="/notifications"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
