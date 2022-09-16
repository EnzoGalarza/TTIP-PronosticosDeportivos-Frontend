import React from "react";
import Login from "./components/Login";
import Matches from "./components/Matches";
import Home from "./components/Home";
import PublicRoutes from "./components/PublicRoutes";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoutes from "./components/PrivateRoutes";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoutes/>}>
            <Route element={<Login/>} path="/login"/>
          </Route>
          <Route element={<PrivateRoutes/>}>
            <Route element={<Home/>} path="/"/> {/*Esta ruta debe ser pública y debe llevar al login cuando esté la funcionalidad*/}
            <Route element={<Home/>} path="/home"/>
            <Route element={<Matches/>} path="/matches/:compId"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
