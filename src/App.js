import React from "react";
import Login from "./components/Login";
import Matches from "./components/Matches";
import Home from "./components/Home";
import Register from "./components/Register";
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
            <Route element={<Register/>} path="/register"/> {/*Esta ruta es pública*/}
            <Route element={<Login/>} path="/"/>  {/*Esta ruta es pública*/}
            <Route element={<Home/>} path="/home"/>
            <Route element={<Matches/>} path="/matches/:compId"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
